import { Todo } from '../types';

const STORAGE_KEY = 'todos_app_data';
const VERSION_KEY = 'todos_app_version';
const CURRENT_VERSION = '1.0.0';

export const localStorage_utils = {
  getTodos: (): Todo[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading todos from localStorage:', error);
      return [];
    }
  },

  saveTodos: (todos: Todo[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  },

  clearTodos: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VERSION_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
