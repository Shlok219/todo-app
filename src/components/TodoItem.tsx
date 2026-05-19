import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { Todo, Priority, Category } from '../types';
import { dateUtils } from '../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Todo>) => void;
}

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-300';
  }
};

const getCategoryColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    shopping: 'bg-pink-100 text-pink-800',
    health: 'bg-green-100 text-green-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return colors[category];
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const isOverdue = todo.dueDate && dateUtils.isOverdue(todo.dueDate) && !todo.completed;

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate({
        title: editedTitle.trim(),
        description: editedDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-600">
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="input-field text-lg font-semibold"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description..."
            className="input-field resize-none h-16"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded transition-smooth"
              title="Cancel"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 hover:bg-green-100 rounded transition-smooth"
              title="Save"
            >
              <Save className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 transition-smooth border-l-4 ${isOverdue ? 'border-red-500 bg-red-50' : 'border-l-transparent'} ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth mt-1 ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-500'}`}
          title={todo.completed ? 'Mark as pending' : 'Mark as completed'}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold break-words ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 break-words ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getPriorityColor(todo.priority)}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getCategoryColor(todo.category)}`}>
              {todo.category}
            </span>
            {todo.dueDate && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${isOverdue ? 'bg-red-100 text-red-800' : dateUtils.isToday(todo.dueDate) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                📅 {dateUtils.getRelativeTime(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-blue-100 rounded transition-smooth"
            title="Edit task"
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-100 rounded transition-smooth"
            title="Delete task"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
