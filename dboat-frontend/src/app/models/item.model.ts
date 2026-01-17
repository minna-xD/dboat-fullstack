export enum ItemType {
  BOOK = 'BOOK',
  GAME = 'GAME'
  // Allows expanding
}

export interface Item {
  id?: number;
  title: string;
  type: ItemType;
  completionDate?: string;
  notes?: string;
  author?: string;
}

