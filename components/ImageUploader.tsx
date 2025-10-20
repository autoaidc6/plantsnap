
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />
      <div
        onClick={!disabled ? handleClick : undefined}
        className={`w-full aspect-video border-2 border-dashed rounded-xl flex flex-col justify-center items-center text-center p-4 transition-colors duration-300 ${
          disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-green-50 hover:bg-green-100 border-green-300 hover:border-green-400'
        }`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Plant preview" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <div className="text-gray-500">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 font-semibold">Click to upload an image</p>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
