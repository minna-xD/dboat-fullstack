export interface Item {
  id?: number;
  title: string;
  type: 'BOOK' | 'GAME';
  completionDate?: Date | null;
  notes?: string;
  author?: string;
}