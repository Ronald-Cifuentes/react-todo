import { useState } from 'react';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';
import { Todo, TodoStatus, SortOption } from '../types';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const [status, setStatus] = useState<TodoStatus>('all');
  const [sort, setSort] = useState<SortOption>('created_at_desc');
  const [search, setSearch] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, error } = useTodos(
    status,
    sort,
    search || undefined
  );
  const createMutation = useCreateTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const handleToggle = (id: string, completed: boolean) => {
    updateMutation.mutate({ id, todo: { completed } });
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (formData: { title: string; description?: string; priority?: number }) => {
    if (editingTodo) {
      updateMutation.mutate(
        { id: editingTodo.id, todo: formData },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingTodo(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTodo(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todo App</h1>

        {showForm && (
          <div className="mb-6">
            <TodoForm
              todo={editingTodo}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        )}

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow"
          >
            + Create New Todo
          </button>
        )}

        <FilterBar
          status={status}
          sort={sort}
          search={search}
          onStatusChange={setStatus}
          onSortChange={setSort}
          onSearchChange={setSearch}
        />

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading todos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">
              Error loading todos. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !error && data && (
          <TodoList
            todos={data.data}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
