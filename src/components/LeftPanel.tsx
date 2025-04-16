import React from 'react';
import { useTranslation } from 'react-i18next';
import Tag from './Tag';
import { LeftPanelProps } from '../types';
import LanguageSelector from './LanguageSelector';

const renderTags = (
  param: string,
  tags: string[],
  onTagClick: (param: string, value: string) => void,
  activeTags: { [key: string]: string[] }
) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {tags.map(tag => {
      const isActive = (activeTags[param] || []).includes(tag);
      return (
        <Tag key={tag} active={isActive} onClick={() => onTagClick(param, tag)}>
          {tag}
        </Tag>
      );
    })}
  </div>
);

const LeftPanel: React.FC<LeftPanelProps> = ({
  search,
  setSearch,
  tags,
  onTagClick,
  activeTags,
  onResetAll,
  showFavorites,
  onToggleFavorites
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="w-1/4 h-full bg-white p-4 overflow-y-auto border-r border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">{t('App.title')}</p>
        <div className="flex items-center gap-2">
          <LanguageSelector />
        </div>
      </div>
      <input
        type="text"
        placeholder={t('LeftPanel.searchPlaceholder')}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 mb-4"
      />
      <div className="flex gap-2 mb-4">
        <div
          onClick={onToggleFavorites}
          className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer border border-gray-200 inline-block w-fit ${
            showFavorites 
              ? 'bg-red-500 text-white border-red-500' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {showFavorites ? t('LeftPanel.showAll') : t('LeftPanel.showFavorites')}
        </div>
        <div
          onClick={onResetAll}
          className="px-2 py-1 rounded text-xs text-gray-600 hover:bg-gray-200 cursor-pointer border border-gray-200 bg-gray-100 inline-block w-fit"
        >
          {t('LeftPanel.resetFilters')}
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-1 font-semibold">{t('LeftPanel.material')}</div>
          {renderTags('material', tags.material, onTagClick, activeTags)}
        </div>
        <div>
          <div className="mb-1 font-semibold">{t('LeftPanel.manufacturer')}</div>
          {renderTags('manufacturer', tags.manufacturer, onTagClick, activeTags)}
        </div>
        <div>
          <div className="mb-1 font-semibold">{t('LeftPanel.scale')}</div>
          {renderTags('scale', tags.scale, onTagClick, activeTags)}
        </div>
        <div>
          <div className="mb-1 font-semibold">{t('LeftPanel.type')}</div>
          {renderTags('type', tags.type, onTagClick, activeTags)}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel; 