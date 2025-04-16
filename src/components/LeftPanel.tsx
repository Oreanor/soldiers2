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
  onResetAll
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="w-1/4 h-full bg-white p-4 overflow-y-auto border-r border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">{t('App.title')}</p>
        <LanguageSelector />
      </div>
      <input
        type="text"
        placeholder={t('LeftPanel.searchPlaceholder')}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 mb-4"
      />
      <div
        className="text-[10px] text-blue-500 hover:underline cursor-pointer mb-2 select-none w-fit"
        onClick={onResetAll}
        tabIndex={0}
        role="button"
      >
        {t('LeftPanel.resetFilters')}
      </div>
      <div className="mb-1 font-semibold">{t('LeftPanel.material')}</div>
      {renderTags('material', tags.material, onTagClick, activeTags)}
      <div className="mb-1 font-semibold">{t('LeftPanel.manufacturer')}</div>
      {renderTags('manufacturer', tags.manufacturer, onTagClick, activeTags)}
      <div className="mb-1 font-semibold">{t('LeftPanel.scale')}</div>
      {renderTags('scale', tags.scale, onTagClick, activeTags)}
      <div className="mb-1 font-semibold">{t('LeftPanel.type')}</div>
      {renderTags('type', tags.type, onTagClick, activeTags)}
    </div>
  );
};

export default LeftPanel; 