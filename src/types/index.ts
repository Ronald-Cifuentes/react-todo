export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: number;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string | null;
  completed?: boolean;
  priority?: number;
}

export type TodoStatus = 'all' | 'open' | 'done';
export type SortOption = 'created_at_desc' | 'created_at_asc' | 'priority_desc' | 'priority_asc';
