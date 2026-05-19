import React from 'react';
import { CheckCircle } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
      <p className="text-gray-500">Create a new task to get started!</p>
    </div>
  );
};
