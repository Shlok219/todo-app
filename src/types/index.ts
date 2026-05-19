export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';
export type TaskStatus = 'pending' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  status: 'all' | 'pending' | 'completed';
  priority: Priority | 'all';
  category: Category | 'all';
  searchQuery: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  highPriority: number;
  overdue: number;
}
