import './App.css'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './components/Card';
import Overlay from './components/Overlay';
import LeftPanel from './components/LeftPanel';
import FavoriteButton from './components/FavoriteButton';
import data from './data/data.json';
import { ItemType } from './types';
import { TAGS } from './consts';
import { getUniqueTags, filterItems } from './utils';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<ItemType | null>(null);
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState<{ [key: string]: string[] }>({});
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const tags = {
    [TAGS.material]: getUniqueTags(data as ItemType[], TAGS.material),
    [TAGS.manufacturer]: getUniqueTags(data as ItemType[], TAGS.manufacturer),
    [TAGS.scale]: getUniqueTags(data as ItemType[], TAGS.scale),
    [TAGS.type]: getUniqueTags(data as ItemType[], TAGS.type),
  };

  const handleTagClick = (param: string, value: string) => {
    setActiveTags(prev => {
      const current = prev[param] || [];
      if (current.includes(value)) {
        return { ...prev, [param]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [param]: [...current, value] };
      }
    });
  };

  const handleResetAll = () => {
    setActiveTags({});
  };

  const toggleFavorite = (id: number) => {
    const idStr = id.toString();
    setFavorites(prev => {
      const newFavorites = prev.includes(idStr)
        ? prev.filter(favId => favId !== idStr)
        : [...prev, idStr];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const items = data as ItemType[];
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesTags = Object.entries(activeTags).every(([param, values]) => {
      if (values.length === 0) return true;
      return values.includes(item[param as keyof typeof item]);
    });
    const matchesFavorites = !showFavorites || favorites.includes(item.id.toString());
    return matchesSearch && matchesTags && matchesFavorites;
  });

  return (
    <div className="flex w-full h-screen">
      <LeftPanel
        search={search}
        setSearch={setSearch}
        tags={tags}
        onTagClick={handleTagClick}
        activeTags={activeTags}
        onResetAll={handleResetAll}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
      />
      <div className="flex flex-col w-full relative">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
            {filteredItems.map((item: ItemType) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
              >
                <FavoriteButton
                  isFavorite={favorites.includes(item.id.toString())}
                  onClick={() => toggleFavorite(item.id)}
                />
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
