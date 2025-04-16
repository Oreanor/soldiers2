import React from 'react';
import { CardProps } from '../types';
import { IMAGE_PATH } from '../consts';

const Card: React.FC<CardProps> = ({ item }) => (
  <div
    className="w-64 rounded-lg shadow p-4 bg-white flex flex-col items-center cursor-pointer hover:shadow-lg transition"
  >
    <img
      src={`${IMAGE_PATH}/${item.folder}/${item.img}`}
      alt={item.name}
      className="w-full h-40 object-contain mb-2 bg-white rounded"
    />
    <div className="font-bold text-lg mb-1 text-center">{item.name}</div>
    <div className="text-sm text-gray-600 mb-2 text-center">{item.manufacturer} • {item.scale}</div>
  </div>
);

export default Card; 