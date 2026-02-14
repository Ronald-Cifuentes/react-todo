import axios from 'axios';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types';

// Get API base URL from environment variable or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  getAll: async (params?: {
    status?: 'all' | 'open' | 'done';
    q?: string;
    sort?: 'created_at_desc' | 'created_at_asc' | 'priority_desc' | 'priority_asc';
  }): Promise<{ data: Todo[]; meta?: any }> => {
    const response = await api.get('/todos', { params });
    return response.data;
  },

  getById: async (id: string): Promise<{ data: Todo }> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  create: async (todo: CreateTodoInput): Promise<{ data: Todo }> => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  update: async (id: string, todo: UpdateTodoInput): Promise<{ data: Todo }> => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
