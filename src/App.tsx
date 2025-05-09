import './App.css'
import { useState, useEffect } from 'react';
import Card from './components/Card';
import Overlay from './components/Overlay';
import LeftPanel from './components/LeftPanel';
import data from './data/data.json';
import { ItemType } from './types';
import { TAGS } from './consts';
import { getUniqueTags } from './utils';
import { useDebounce } from './utils/hooks';
import './i18n';

function App() {
  const [selected, setSelected] = useState<ItemType | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [activeTags, setActiveTags] = useState<{ [key: string]: string[] }>({});
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState<number>(0);

  // Проверка URL при загрузке приложения
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('item');
    const imageIdx = urlParams.get('image');
    
    if (itemId) {
      const item = (data as ItemType[]).find(item => item.id.toString() === itemId);
      if (item) {
        setSelected(item);
        if (imageIdx) {
          const idx = parseInt(imageIdx, 10);
          if (!isNaN(idx) && idx >= 0 && idx < (item.figures?.length || 0) + 1) {
            setInitialImageIndex(idx);
          }
        }
      }
    }
  }, []);

  // Обновление URL при выборе элемента
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selected) {
      url.searchParams.set('item', selected.id.toString());
    } else {
      url.searchParams.delete('item');
      url.searchParams.delete('image');
    }
    window.history.pushState({}, '', url.toString());
  }, [selected]);

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
    const searchLower = debouncedSearch.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchLower) || 
                         item.manufacturer.toLowerCase().includes(searchLower);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[10px] sm:gap-3 md:gap-4 lg:gap-6 items-start">
            {filteredItems.map((item: ItemType) => (
              <Card
                key={item.id}
                item={item}
                onClick={() => setSelected(item)}
                isFavorite={favorites.includes(item.id.toString())}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <Overlay 
          item={selected} 
          onClose={() => {
            setSelected(null);
            setInitialImageIndex(0);
          }} 
          initialImageIndex={initialImageIndex}
        />
      )}
    </div>
  )
}

export default App
