import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../lib/api';
import { Todo, CreateTodoInput, UpdateTodoInput, TodoStatus, SortOption } from '../types';

export const useTodos = (status: TodoStatus = 'all', sort: SortOption = 'created_at_desc', search?: string) => {
  return useQuery({
    queryKey: ['todos', status, sort, search],
    queryFn: () => todoApi.getAll({ status, sort, q: search }),
  });
};

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => todoApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: CreateTodoInput) => todoApi.create(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: UpdateTodoInput }) =>
      todoApi.update(id, todo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
