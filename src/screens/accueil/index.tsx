import React from 'react';
import type { ApiResponse } from '../../types/index';
import ChipButton from '../../components/shared/ChipButton';

interface ScreenProps {
  data: ApiResponse;
  onChipClick: (text: string) => void;
}

const AccueilScreen: React.FC<ScreenProps> = ({ data, onChipClick }) => {
  return (
    <div className="flex flex-col h-screen p-6 md:p-10 justify-between">
      <header className="flex-shrink-0">
         {/* Could add a header here if needed */}
      </header>

      <div className="flex-grow flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-300 mb-4">{data.on_screen}</h1>
            <p className="text-lg md:text-xl text-gray-300">{data.voice}</p>
        </div>
        
        {data.cta && (
          <button
            onClick={() => onChipClick(data.cta?.label || 'Continue')}
            className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {data.cta.label}
          </button>
        )}
      </div>

      <footer className="flex-shrink-0 flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-8">
        {data.chips.map((chip, index) => (
          <ChipButton key={index} text={chip} onClick={onChipClick} />
        ))}
      </footer>
    </div>
  );
};

export default AccueilScreen;