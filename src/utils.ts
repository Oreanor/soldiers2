import { ItemType } from './types';

export function getUniqueTags(arr: ItemType[], key: keyof ItemType): string[] {
  return Array.from(new Set(arr.map(item => item[key]).filter(Boolean) as string[])).sort();
}

export function filterItems(
  items: ItemType[],
  search: string,
  tagFilter: { [key: string]: string[] }
): ItemType[] {
  return items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.manufacturer && item.manufacturer.toLowerCase().includes(search.toLowerCase()));
    const matchesTags = Object.entries(tagFilter).every(
      ([key, values]) => !values.length || values.includes(item[key as keyof ItemType])
    );
    return matchesSearch && matchesTags;
  });
} 