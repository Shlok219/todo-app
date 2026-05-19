export const dateUtils = {
  isOverdue: (dueDate: string | undefined): boolean => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  },

  isToday: (dueDate: string | undefined): boolean => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    return due.toDateString() === today.toDateString();
  },

  isTomorrow: (dueDate: string | undefined): boolean => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return due.toDateString() === tomorrow.toDateString();
  },

  formatDate: (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  formatDateForInput: (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  },

  getRelativeTime: (dueDate: string | undefined): string => {
    if (!dueDate) return '';
    if (dateUtils.isOverdue(dueDate)) return 'Overdue';
    if (dateUtils.isToday(dueDate)) return 'Today';
    if (dateUtils.isTomorrow(dueDate)) return 'Tomorrow';
    return dateUtils.formatDate(dueDate);
  },
};
