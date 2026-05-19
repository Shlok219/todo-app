# 📝 Todo App - Modern Task Management

A beautiful, modern todo application with local storage persistence, priority levels, categories, and due date tracking.

## 🌟 Features

### Core Functionality
- ✅ **Create, Edit, Delete Tasks** - Manage your tasks with ease
- 🎯 **Priority Levels** - Low, Medium, High priority classification
- 📂 **Categories** - Work, Personal, Shopping, Health, Other
- 📅 **Due Dates** - Set deadlines and track overdue tasks
- 💾 **Local Storage** - All data persists in your browser
- 📊 **Real-time Statistics** - Track completion rate and pending tasks

### Advanced Features
- 🔍 **Smart Search** - Find tasks by title or description
- 🎨 **Advanced Filtering** - Filter by status, priority, and category
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile
- 🚀 **High Performance** - Built with React and TypeScript
- 🌈 **Beautiful UI** - Modern design with Tailwind CSS

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon Library
- **Browser LocalStorage** - Data Persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Shlok219/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 📱 Usage

### Adding a Task
1. Click on the "What needs to be done?" input
2. The form expands to show all options
3. Enter your task title and optional description
4. Set priority, category, and due date
5. Click "Add Task"

### Managing Tasks
- **Complete** - Click the checkbox to mark as done
- **Edit** - Click the edit icon to modify
- **Delete** - Click the trash icon to remove
- **Search** - Use the search bar to find tasks
- **Filter** - Use filters to view specific tasks

### Statistics
The header shows:
- Total tasks count
- Completed tasks
- Pending tasks
- Completion percentage
- Overdue and high-priority alerts

## 📊 Data Structure

Each todo has:
```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'shopping' | 'health' | 'other';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 💾 Local Storage

All data is automatically saved to your browser's local storage under the key `todos_app_data`. No backend or internet required!

## 🎨 Customization

### Colors
Modify Tailwind configuration in `tailwind.config.js` to change the color scheme.

### Icons
Lucide icons can be replaced or customized in component files.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for productivity**
