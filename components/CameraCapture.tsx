
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, X, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capabilities, setCapabilities] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pinch-to-zoom state
  const prevDistanceRef = useRef<number | null>(null);

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const track = mediaStream.getVideoTracks()[0];
      // Note: getCapabilities is not available on some browsers/platforms
      if (track.getCapabilities) {
        const caps = track.getCapabilities();
        setCapabilities(caps);
        if (caps.zoom) {
          setZoom(caps.zoom.min || 1);
        }
      }
      
      setIsCameraReady(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions and ensure you are using HTTPS.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleZoomChange = useCallback((value: number) => {
    if (!stream || !capabilities?.zoom) return;
    
    const track = stream.getVideoTracks()[0];
    const zoomValue = Math.max(capabilities.zoom.min || 1, Math.min(capabilities.zoom.max || 10, value));
    
    setZoom(zoomValue);
    
    try {
      if (track.applyConstraints) {
        track.applyConstraints({ advanced: [{ zoom: zoomValue }] } as any);
      }
    } catch (e) {
      console.error("Failed to apply zoom", e);
    }
  }, [stream, capabilities]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && capabilities?.zoom) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      
      if (prevDistanceRef.current !== null) {
        const delta = distance - prevDistanceRef.current;
        const zoomStep = delta * 0.01;
        handleZoomChange(zoom + zoomStep);
      }
      prevDistanceRef.current = distance;
    }
  };

  const handleTouchEnd = () => {
    prevDistanceRef.current = null;
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Use video dimensions for capture
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
            onCapture(file);
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent pt-8">
          <button onClick={onClose} className="p-2.5 bg-black/40 rounded-full text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90">
            <X size={24} />
          </button>
          <div className="text-white text-sm font-semibold tracking-wide flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            LIVE VIEW
          </div>
          <button onClick={startCamera} className="p-2.5 bg-black/40 rounded-full text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90">
            <RefreshCw size={24} />
          </button>
        </div>

        {/* Video Surface */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center bg-zinc-900">
          {error ? (
            <div className="text-white text-center p-8 bg-zinc-800 rounded-3xl border border-white/10 max-w-xs shadow-2xl">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/50">
                <Camera size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Camera Error</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{error}</p>
              <button 
                onClick={startCamera} 
                className="w-full py-3 bg-white text-black rounded-xl font-bold transition-transform active:scale-95"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
              {/* Target bracket */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-6 bg-gradient-to-t from-black/80 to-transparent pb-12">
          
          {/* Zoom Slider */}
          {capabilities?.zoom && (
            <div className="flex items-center gap-4 text-white max-w-sm mx-auto w-full px-4">
              <button 
                onClick={() => handleZoomChange(zoom - 0.5)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <ZoomOut size={20} />
              </button>
              <div className="flex-1 relative flex items-center h-8">
                <input 
                  type="range" 
                  min={capabilities.zoom.min || 1} 
                  max={capabilities.zoom.max || 10} 
                  step="0.1" 
                  value={zoom} 
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-white/20 accent-green-500 cursor-pointer"
                />
              </div>
              <button 
                 onClick={() => handleZoomChange(zoom + 0.5)}
                 className="p-1 hover:bg-white/10 rounded"
              >
                <ZoomIn size={20} />
              </button>
              <div className="w-10 text-right">
                <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                    {zoom.toFixed(1)}X
                </span>
              </div>
            </div>
          )}

          {/* Capture Button */}
          <div className="flex items-center justify-center">
            <button 
              onClick={capturePhoto}
              disabled={!isCameraReady}
              className={`group relative flex items-center justify-center w-24 h-24 rounded-full border-[6px] border-white/30 p-1.5 transition-all active:scale-90 hover:border-white/50 ${!isCameraReady && 'opacity-50 grayscale cursor-not-allowed'}`}
            >
              <div className="w-full h-full rounded-full bg-white shadow-inner flex items-center justify-center transition-colors group-hover:bg-green-50 text-green-600">
                <div className="w-16 h-16 rounded-full border-2 border-green-500 animate-pulse opacity-0 group-active:opacity-100"></div>
              </div>
            </button>
          </div>
          
          <p className="text-white/40 text-[10px] text-center uppercase tracking-widest font-bold">
            Pinch to zoom supported
          </p>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </motion.div>
  );
};

export default CameraCapture;
