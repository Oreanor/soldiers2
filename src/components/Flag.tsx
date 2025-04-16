import React from 'react';
import { FLAGS } from '../consts';

interface FlagProps {
  code: string;
  className?: string;
}

const Flag: React.FC<FlagProps> = ({ code, className = '' }) => {
  return (
    <span 
      className={`inline-block w-4 h-3 ${className}`}
      dangerouslySetInnerHTML={{ __html: FLAGS[code as keyof typeof FLAGS] || '' }}
    />
  );
};

export default Flag; 