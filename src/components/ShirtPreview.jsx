import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const ZoomInIcon = getIcon('ZoomIn');
const ZoomOutIcon = getIcon('ZoomOut');
const RotateIcon = getIcon('RotateCw');

export default function ShirtPreview({ design }) {
  const [zoom, setZoom] = useState(1);
  const [view, setView] = useState('front');

  return (
    <div className="card p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 1.5))}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400"
          >
            <ZoomInIcon size={18} />
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.8))}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400"
          >
            <ZoomOutIcon size={18} />
          </button>
          <button 
            onClick={() => setView(prev => prev === 'front' ? 'back' : 'front')}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400"
          >
            <RotateIcon size={18} />
          </button>
        </div>
      </div>
      
      <div className="bg-surface-100 dark:bg-surface-800 rounded-xl h-[400px] flex items-center justify-center overflow-hidden">
        <div className="relative" style={{ transform: `scale(${zoom})` }}>
          {/* Shirt Base */}
          <svg width="300" height="350" viewBox="0 0 300 350">
            <path d="M75,50 L125,20 L175,20 L225,50 L250,100 L230,120 L230,330 L70,330 L70,120 L50,100 L75,50" 
              fill={design.color} stroke="#000" strokeWidth="2" />
            <path d="M125,20 L175,20 L175,70 L125,70 Z" 
              fill="white" fillOpacity="0.2" />
          </svg>
          
          {/* Render text elements on the shirt */}
          {design.text.map(item => (
            <div key={item.id} className="absolute" style={{ top: `${item.position.y}%`, left: `${item.position.x}%`, transform: 'translate(-50%, -50%)', color: item.color, fontSize: `${item.size}px`, fontFamily: item.font }}>
              {item.content}
            </div>
          ))}
          
          {/* Render image elements on the shirt */}
          {design.images.map(item => (
            <img 
              key={item.id}
              src={item.url} 
              alt="Design element" 
              className="absolute pointer-events-none"
              style={{ 
                top: `${item.position.y}%`, 
                left: `${item.position.x}%`,
                width: `${item.width}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}