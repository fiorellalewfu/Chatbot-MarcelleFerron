import React from 'react';
import type { Oeuvre } from '../../types/index';

interface ArtworkCardProps {
  oeuvre: Oeuvre;
  onClick: (id: string, title: string) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ oeuvre, onClick }) => {
  const colorMap: { [key: string]: string } = {
    rouge: 'bg-red-500',
    noir: 'bg-gray-800',
    blanc: 'bg-white',
    bleu: 'bg-blue-500',
    jaune: 'bg-yellow-400',
    multicolore: 'bg-gradient-to-br from-purple-500 to-pink-500',
    orange: 'bg-orange-500',
    vert: 'bg-green-500',
  };

  return (
    <div
      onClick={() => onClick(oeuvre.id, oeuvre.titre)}
      className="group cursor-pointer bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
    >
      <div className="w-full h-48 sm:h-56 relative overflow-hidden">
        <img 
            src={`https://picsum.photos/seed/${oeuvre.id}/400/300`} 
            alt={oeuvre.titre}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white truncate">{oeuvre.titre}</h3>
        <p className="text-sm text-gray-400 capitalize flex-grow">{oeuvre.pitch_10s}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {oeuvre.couleurs_tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-xs rounded-full ${colorMap[tag] || 'bg-gray-600'} ${tag === 'blanc' ? 'text-black' : 'text-white'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;