import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OverlayProps } from '../types';
import { IMAGE_PATH } from '../consts';

const Overlay: React.FC<OverlayProps> = ({ item, onClose }) => {
  const { t } = useTranslation();
  
  // Main image is always first
  const images = [item.img, ...(item.figures?.map(f => f.img) || [])];
  const figureNames = [item.name, ...(item.figures?.map(f => f.name) || [])];

  const [mainIdx, setMainIdx] = useState(0);
  const mainImg = images[mainIdx];
  

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
        <div 
          className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-black cursor-pointer w-8 h-8 flex items-center justify-center" 
          onClick={onClose}
        >
          ×
        </div>
        <div className="font-bold text-2xl mb-2">{item.name}</div>
        <div className="text-gray-600 mb-2 italic">{[item.manufacturer, item.year, item.scale].filter(Boolean).join(', ')}</div>
        {item.desc && <div className="mb-4 text-gray-700 text-sm">{item.desc}</div>}
        <img
          src={`${IMAGE_PATH}/${item.folder}/${mainImg}`}
          alt={figureNames[mainIdx] || t('Overlay.generalImage')}
          className="w-full max-h-96 object-contain mb-2 rounded"
        />
        <div className="text-center text-xs mb-2 min-h-[1.5em]">
          {mainIdx === 0 ? t('Overlay.generalImage') : (figureNames[mainIdx] || '')}
        </div>
        
        {images.length > 1 && (
          <div>
            <div className="flex flex-nowrap gap-2 overflow-x-auto p-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative" onClick={() => setMainIdx(idx)}>
                  <img
                    src={`${IMAGE_PATH}/${item.folder}/${img}`}
                    alt={figureNames[idx] || t('Overlay.generalImage')}
                    className={`w-24 h-24 object-contain rounded cursor-pointer ${mainIdx === idx ? 'ring-2 ring-blue-400' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overlay; 