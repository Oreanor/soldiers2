import './App.css'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './components/Card';
import Overlay from './components/Overlay';
import LeftPanel from './components/LeftPanel';
import data from './data/data.json';
import { ItemType } from './types';
import { TAGS } from './consts';
import { getUniqueTags, filterItems } from './utils';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<ItemType | null>(null);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<{[key: string]: string[]}>({});

  const tags = {
    [TAGS.material]: getUniqueTags(data as ItemType[], TAGS.material),
    [TAGS.manufacturer]: getUniqueTags(data as ItemType[], TAGS.manufacturer),
    [TAGS.scale]: getUniqueTags(data as ItemType[], TAGS.scale),
    [TAGS.type]: getUniqueTags(data as ItemType[], TAGS.type),
  };

  const filtered = filterItems(data as ItemType[], search, tagFilter);

  const handleTagClick = (param: string, value: string) => {
    setTagFilter(prev => {
      const current = prev[param] || [];
      if (current.includes(value)) {
        return { ...prev, [param]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [param]: [...current, value] };
      }
    });
  };

  const handleResetAll = () => {
    setTagFilter({});
  };

  return (
    <div className="flex w-full h-screen">
      <LeftPanel
        search={search}
        setSearch={setSearch}
        tags={tags}
        onTagClick={handleTagClick}
        activeTags={tagFilter}
        onResetAll={handleResetAll}
      />
      <div className="flex flex-col w-full relative">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
            {filtered.map((item: ItemType) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <Overlay item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

export default App
