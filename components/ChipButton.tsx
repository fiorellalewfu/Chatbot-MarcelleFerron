
import React from 'react';

interface ChipButtonProps {
  text: string;
  onClick: (text: string) => void;
  className?: string;
}

const ChipButton: React.FC<ChipButtonProps> = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={() => onClick(text)}
      className={`
        px-5 py-3 
        bg-gray-700 hover:bg-blue-600 
        border-2 border-gray-600 hover:border-blue-500
        rounded-full 
        text-white text-base md:text-lg font-semibold 
        transition-all duration-200 ease-in-out 
        transform hover:scale-105
        shadow-md
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default ChipButton;
