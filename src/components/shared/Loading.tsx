import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute animate-ping rounded-full h-32 w-32 bg-red-500 opacity-30"></div>
        <p className="text-xl font-semibold z-10">Je réfléchis...</p>
      </div>
    </div>
  );
};

export default Loading;
