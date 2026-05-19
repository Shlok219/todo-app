import React from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { TodoStats } from '../types';

interface HeaderProps {
  stats: TodoStats;
  onClearCompleted: () => void;
}

export const Header: React.FC<HeaderProps> = ({ stats, onClearCompleted }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Todo App</h1>
          </div>
          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-smooth"
              title="Clear completed tasks"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Completed</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-sm opacity-90">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-sm opacity-90">Completed</div>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-sm opacity-90">Pending</div>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-sm opacity-90">Progress</div>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
          </div>
        </div>

        {(stats.highPriority > 0 || stats.overdue > 0) && (
          <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm">
            {stats.overdue > 0 && <div>⚠️ {stats.overdue} overdue task(s)</div>}
            {stats.highPriority > 0 && <div>🔴 {stats.highPriority} high priority task(s)</div>}
          </div>
        )}
      </div>
    </header>
  );
};
