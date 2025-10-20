import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Consulting with our digital botanist...",
  "Analyzing pixels and petals...",
  "Identifying leaf patterns...",
  "Cross-referencing with our plant database...",
  "Just a moment, nature is complex!",
];

const Loader: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-8 text-center">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-green-700 font-medium">{message}</p>
    </div>
  );
};

export default Loader;