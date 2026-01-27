
import React from 'react';
import type { ApiResponse } from '../types';
import ChipButton from './ChipButton';

interface ScreenProps {
  data: ApiResponse;
  onChipClick: (text: string) => void;
}

const ChatScreen: React.FC<ScreenProps> = ({ data, onChipClick }) => {
  const { ui_hints, cta } = data;
  
  const primaryColor = ui_hints.palette_focus[1] || '#3b82f6';
  const secondaryColor = ui_hints.palette_focus[0] || '#ef4444';
  const borderColor = ui_hints.palette_focus[3] || '#111827';

  const backgroundStyle: React.CSSProperties = {
     background: `radial-gradient(circle, ${primaryColor}1A 0%, #111827 70%)`,
  };

  return (
    <div className="flex flex-col h-screen p-6 md:p-10 justify-between" style={backgroundStyle}>
      <header className="flex-shrink-0 text-center">
         <h2 className="text-2xl font-bold text-gray-400 opacity-75">Parler à Marcelle</h2>
      </header>

      <div className="flex-grow flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full">
        <div 
          className="bg-gray-800/80 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-2xl border-4 transition-all duration-500"
          style={{ 
            borderColor: borderColor, 
            boxShadow: `0 0 25px ${primaryColor}50`,
          }}
        >
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>{data.on_screen}</h1>
            <p className="text-lg md:text-xl text-gray-200">{data.voice}</p>
        </div>
        
        {cta && (
          <button
            onClick={() => onChipClick(cta.label || 'Continue')}
            className="mt-10 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: secondaryColor }}
          >
            {cta.label}
          </button>
        )}
      </div>

      <footer className="flex-shrink-0 flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-8">
        {data.chips.map((chip, index) => (
          <ChipButton 
            key={index} 
            text={chip} 
            onClick={onChipClick}
            className="bg-gray-800/80 border-gray-900 hover:bg-blue-600"
            style={{ borderColor: borderColor }}
          />
        ))}
      </footer>
    </div>
  );
};

export default ChatScreen;
