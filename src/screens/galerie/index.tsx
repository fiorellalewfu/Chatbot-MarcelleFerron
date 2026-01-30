import React from 'react';
import type { ApiResponse, Oeuvre } from '../../types/index';
import ArtworkCard from '../../components/shared/ArtworkCard';
import ChipButton from '../../components/shared/ChipButton';

interface GalerieScreenProps {
  data: ApiResponse;
  onChipClick: (text: string) => void;
  oeuvres: Oeuvre[];
}

const GalerieScreen: React.FC<GalerieScreenProps> = ({ data, onChipClick, oeuvres }) => {
  const handleArtworkClick = (id: string, title: string) => {
    onChipClick(`Je choisis l'œuvre "${title}" (ID: ${id})`);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-300">{data.on_screen}</h1>
        <p className="text-lg text-gray-300 mt-2 max-w-3xl mx-auto">{data.voice}</p>
      </header>

      <main className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {oeuvres.map((oeuvre) => (
            <ArtworkCard key={oeuvre.id} oeuvre={oeuvre} onClick={handleArtworkClick} />
          ))}
        </div>
      </main>

      <footer className="flex-shrink-0 flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-12">
        {data.chips.map((chip, index) => (
          <ChipButton key={index} text={chip} onClick={onChipClick} />
        ))}
      </footer>
    </div>
  );
};

export default GalerieScreen;