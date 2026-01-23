
import React, { useState, useMemo, useEffect } from 'react';
import type { ApiResponse } from '../types';
import { CATALOGUE } from '../constants';
import ChipButton from './ChipButton';

interface Shape {
  id: number;
  type: 'circle' | 'rect';
  color: string;
  x: number;
  y: number;
  size: number;
}

interface AtelierScreenProps {
  data: ApiResponse;
  onChipClick: (text: string) => void;
}

const AtelierScreen: React.FC<AtelierScreenProps> = ({ data, onChipClick }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('#ef4444');
  const [currentShapeType, setCurrentShapeType] = useState<'circle' | 'rect'>('rect');

  const palette = useMemo(() => {
    const oeuvreId = data.context?.oeuvre_id;
    if (oeuvreId) {
      const oeuvre = CATALOGUE.oeuvres.find(o => o.id === oeuvreId);
      if (oeuvre && oeuvre.palette_atelier) {
        return oeuvre.palette_atelier;
      }
    }
    return ['#ef4444', '#3b82f6', '#facc15', '#22c55e', '#111827', '#f9fafb']; // Default
  }, [data.context]);
  
  useEffect(() => {
    setCurrentColor(palette[0]);
  }, [palette]);

  const handleCanvasClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const screenCTM = svg.getScreenCTM();
    if (!screenCTM) return;
    const { x, y } = pt.matrixTransform(screenCTM.inverse());
    
    const newShape: Shape = {
      id: Date.now(),
      type: currentShapeType,
      color: currentColor,
      x,
      y,
      size: Math.random() * 60 + 20, // Random size
    };
    setShapes(prevShapes => [...prevShapes, newShape]);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
      {/* Controls and Info Panel */}
      <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col bg-gray-800 rounded-lg p-6 justify-between border border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-blue-300 mb-2">{data.on_screen}</h1>
          <p className="text-gray-300 mb-6">{data.voice}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">1. Choisis ta palette</h3>
              <div className="flex flex-wrap gap-2">
                {palette.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 ${currentColor === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">2. Choisis une forme</h3>
              <div className="flex gap-4">
                <button onClick={() => setCurrentShapeType('rect')} className={`p-3 rounded-lg ${currentShapeType === 'rect' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M3 3h18v18H3z"/></svg>
                </button>
                 <button onClick={() => setCurrentShapeType('circle')} className={`p-3 rounded-lg ${currentShapeType === 'circle' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/></svg>
                </button>
              </div>
            </div>
             <div>
              <h3 className="text-lg font-semibold mb-3">3. Crée!</h3>
              <p className="text-gray-400 text-sm">Clique sur la toile pour ajouter des formes.</p>
            </div>
             <button
              onClick={() => setShapes([])}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              Effacer
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
            {data.chips.map((chip, index) => (
              <ChipButton key={index} text={chip} onClick={onChipClick} />
            ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full lg:w-2/3 xl:w-3/4 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
        <svg
          className="w-full h-full cursor-crosshair"
          onClick={handleCanvasClick}
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect width="100%" height="100%" fill="#111827" />
          {shapes.map((shape) => {
            if (shape.type === 'circle') {
              return <circle key={shape.id} cx={shape.x} cy={shape.y} r={shape.size / 2} fill={shape.color} className="transition-all" />;
            }
            // Fix: Changed 'y' to 'shape.y' to correctly reference the shape's y-coordinate.
            return <rect key={shape.id} x={shape.x - shape.size / 2} y={shape.y - shape.size / 2} width={shape.size} height={shape.size} fill={shape.color} className="transition-all" />;
          })}
        </svg>
      </div>
    </div>
  );
};

export default AtelierScreen;
