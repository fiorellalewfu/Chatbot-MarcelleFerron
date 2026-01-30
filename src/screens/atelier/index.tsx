import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { ApiResponse, AtelierShape, Point } from '../../types/index';
import { CATALOGUE } from '../../constants/catalogue';
import ChipButton from '../../components/shared/ChipButton';

interface AtelierScreenProps {
  data: ApiResponse;
  onChipClick: (text: string) => void;
}

type Tool = 'rect' | 'circle' | 'brush';
const BRUSH_SIZES = { fin: 4, moyen: 10, epais: 20 };

function pointsToPathD(points: Point[]): string {
  if (points.length < 2) {
    return points.map(p => `M ${p.x - 0.5} ${p.y} A 0.5 0.5 0 1 0 ${p.x} ${p.y}`).join(' ');
  }
  return points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, "");
}

const AtelierScreen: React.FC<AtelierScreenProps> = ({ data, onChipClick }) => {
  const [shapes, setShapes] = useState<AtelierShape[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('#ef4444');
  const [currentTool, setCurrentTool] = useState<Tool>('rect');
  const [brushSize, setBrushSize] = useState<number>(BRUSH_SIZES.moyen);
  const isDrawing = useRef(false);

  const palette = useMemo(() => {
    const oeuvreId = data.context?.oeuvre_id;
    if (oeuvreId) {
      const oeuvre = CATALOGUE.oeuvres.find(o => o.id === oeuvreId);
      if (oeuvre && oeuvre.palette_atelier) {
        return oeuvre.palette_atelier;
      }
    }
    return ['#ef4444', '#3b82f6', '#facc15', '#22c55e', '#111827', '#f9fafb'];
  }, [data.context]);

  useEffect(() => {
    setCurrentColor(palette[0]);
  }, [palette]);

  const getPointInSvg = (event: React.PointerEvent<SVGSVGElement>): Point | null => {
    const svg = event.currentTarget;
    const screenCTM = svg.getScreenCTM();
    if (!screenCTM) return null;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(screenCTM.inverse());
  };

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!event.isPrimary) return;
    isDrawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPointInSvg(event);
    if (!point) return;
    if (currentTool === 'brush') {
      setShapes(prev => [...prev, { id: Date.now(), type: 'path', color: currentColor, strokeWidth: brushSize, points: [point] }]);
    } else {
      setShapes(prev => [...prev, { id: Date.now(), type: currentTool, color: currentColor, x: point.x, y: point.y, size: Math.random() * 60 + 40 }]);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing.current || !event.isPrimary || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const point = getPointInSvg(event);
    if (!point) return;
    if (currentTool === 'brush') {
      setShapes(prev => {
        const lastShape = prev[prev.length - 1];
        if (lastShape && lastShape.type === 'path') {
          const newShapes = [...prev];
          newShapes[newShapes.length - 1] = { ...lastShape, points: [...lastShape.points, point] };
          return newShapes;
        }
        return prev;
      });
    }
  };

  const handlePointerUp = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!event.isPrimary) return;
    isDrawing.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
      <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col bg-gray-800 rounded-lg p-6 justify-between border border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-blue-300 mb-2">{data.on_screen}</h1>
          <p className="text-gray-300 mb-6">{data.voice}</p>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">1. Choisis ta palette</h3>
              <div className="flex flex-wrap gap-2">{palette.map((color) => (<button key={color} onClick={() => setCurrentColor(color)} className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 ${currentColor === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''}`} style={{ backgroundColor: color }} aria-label={`Select color ${color}`} />))}</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">2. Choisis une forme</h3>
              <div className="flex gap-4">
                <button title="Rectangle" onClick={() => setCurrentTool('rect')} className={`p-3 rounded-lg ${currentTool === 'rect' ? 'bg-blue-600' : 'bg-gray-700'}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M3 3h18v18H3z"/></svg></button>
                <button title="Cercle" onClick={() => setCurrentTool('circle')} className={`p-3 rounded-lg ${currentTool === 'circle' ? 'bg-blue-600' : 'bg-gray-700'}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/></svg></button>
                <button title="Pinceau" onClick={() => setCurrentTool('brush')} className={`p-3 rounded-lg ${currentTool === 'brush' ? 'bg-blue-600' : 'bg-gray-700'}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>
              </div>
            </div>
            {currentTool === 'brush' && (<div><h3 className="text-lg font-semibold mb-3">Épaisseur du pinceau</h3><div className="flex gap-4 items-center"><button onClick={() => setBrushSize(BRUSH_SIZES.fin)} className={`px-4 py-2 rounded-lg ${brushSize === BRUSH_SIZES.fin ? 'bg-blue-600' : 'bg-gray-700'}`}>Fin</button><button onClick={() => setBrushSize(BRUSH_SIZES.moyen)} className={`px-4 py-2 rounded-lg ${brushSize === BRUSH_SIZES.moyen ? 'bg-blue-600' : 'bg-gray-700'}`}>Moyen</button><button onClick={() => setBrushSize(BRUSH_SIZES.epais)} className={`px-4 py-2 rounded-lg ${brushSize === BRUSH_SIZES.epais ? 'bg-blue-600' : 'bg-gray-700'}`}>Épais</button></div></div>)}
            <button onClick={() => setShapes([])} className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors mt-4">Tout effacer</button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-8">{data.chips.map((chip, index) => (<ChipButton key={index} text={chip} onClick={onChipClick} />))}</div>
      </div>
      <div className="w-full lg:w-2/3 xl:w-3/4 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
        <svg className="w-full h-full cursor-crosshair touch-none" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          <rect width="100%" height="100%" fill="#111827" />
          {shapes.map((shape) => {
            if (shape.type === 'circle') return <circle key={shape.id} cx={shape.x} cy={shape.y} r={shape.size / 2} fill={shape.color} />;
            if (shape.type === 'rect') return <rect key={shape.id} x={shape.x - shape.size / 2} y={shape.y - shape.size / 2} width={shape.size} height={shape.size} fill={shape.color} />;
            if (shape.type === 'path') return <path key={shape.id} d={pointsToPathD(shape.points)} fill="none" stroke={shape.color} strokeWidth={shape.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            return null;
          })}
        </svg>
      </div>
    </div>
  );
};
export default AtelierScreen;