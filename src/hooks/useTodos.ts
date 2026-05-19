import { useState, useEffect, useCallback } from 'react';
import { Todo, Priority, Category, FilterOptions, TodoStats } from '../types';
import { localStorage_utils } from '../utils/localStorage';
import { dateUtils } from '../utils/dateUtils';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    category: 'all',
    searchQuery: '',
  });

  useEffect(() => {
    const savedTodos = localStorage_utils.getTodos();
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage_utils.saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((title: string, priority: Priority = 'medium', category: Category = 'personal', dueDate?: string, description?: string) => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const getFilteredTodos = useCallback((): Todo[] => {
    return todos.filter((todo) => {
      if (filters.status === 'completed' && !todo.completed) return false;
      if (filters.status === 'pending' && todo.completed) return false;
      if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;
      if (filters.category !== 'all' && todo.category !== filters.category) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          (todo.description?.toLowerCase().includes(query) ?? false)
        );
      }
      return true;
    });
  }, [todos, filters]);

  const getStats = useCallback((): TodoStats => {
    const completed = todos.filter((t) => t.completed).length;
    const pending = todos.length - completed;
    const highPriority = todos.filter((t) => t.priority === 'high' && !t.completed).length;
    const overdue = todos.filter(
      (t) => !t.completed && t.dueDate && dateUtils.isOverdue(t.dueDate)
    ).length;

    return {
      total: todos.length,
      completed,
      pending,
      completionRate: todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0,
      highPriority,
      overdue,
    };
  }, [todos]);

  return {
    todos,
    filters,
    setFilters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    getFilteredTodos,
    getStats,
  };
};
