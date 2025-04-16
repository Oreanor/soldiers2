export type ItemType = {
  id: number;
  name: string;
  manufacturer: string;
  scale: string;
  year: string;
  folder: string;
  img: string;
  material: string;
  type: string;
  desc?: string;
  figures?: { name: string; img: string }[];
  [key: string]: any;
};

export interface OverlayProps {
  item: ItemType;
  onClose: () => void;
}

export interface CardProps {
  item: ItemType;
  onClick?: (item: ItemType) => void;
}

export interface LeftPanelProps {
  search: string;
  setSearch: (value: string) => void;
  tags: {
    material: string[];
    manufacturer: string[];
    scale: string[];
    type: string[];
  };
  onTagClick: (param: string, value: string) => void;
  activeTags: { [key: string]: string[] };
  onResetAll: () => void;
} 