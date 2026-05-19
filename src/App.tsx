import React from 'react';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoItem } from './components/TodoItem';
import { EmptyState } from './components/EmptyState';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
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
  } = useTodos();

  const filteredTodos = getFilteredTodos();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header stats={stats} onClearCompleted={clearCompleted} />

      <main className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <TodoForm
            onSubmit={(title, priority, category, dueDate, description) =>
              addTodo(title, priority, category, dueDate, description)
            }
          />

          <FilterBar filters={filters} onFilterChange={setFilters} />

          <div className="space-y-4">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onUpdate={(updates) => updateTodo(todo.id, updates)}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md">
                <EmptyState />
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="text-center text-white/60 text-sm">
              All your tasks are automatically saved to your browser
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
