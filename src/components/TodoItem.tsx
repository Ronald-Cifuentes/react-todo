import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const priorityColors: Record<number, string> = {
    1: 'bg-red-100 text-red-800',
    2: 'bg-orange-100 text-orange-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-blue-100 text-blue-800',
    5: 'bg-green-100 text-green-800',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-l-4 ${
        todo.completed ? 'opacity-60 border-gray-300' : 'border-blue-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-gray-600 mt-1 text-sm">{todo.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                priorityColors[todo.priority] || priorityColors[3]
              }`}
            >
              Priority {todo.priority}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(todo.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
