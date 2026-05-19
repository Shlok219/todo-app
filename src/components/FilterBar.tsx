import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterOptions, Priority, Category } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleReset = () => {
    onFilterChange({
      status: 'all',
      priority: 'all',
      category: 'all',
      searchQuery: '',
    });
  };

  const isFiltered =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="ml-auto text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" /> Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              className="input-field pl-10 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                status: e.target.value as FilterOptions['status'],
              })
            }
            className="input-field w-full"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priority: e.target.value as Priority | 'all',
              })
            }
            className="input-field w-full"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                category: e.target.value as Category | 'all',
              })
            }
            className="input-field w-full"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};
