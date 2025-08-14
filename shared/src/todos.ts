export type TodoItemIdType = string;

export type TodoItemType = {
  id: TodoItemIdType;
  content: string;
  completed: boolean;
  createdAt: string;
};

export type UpdateTodoItemInputType = {
  id: TodoItemIdType;
  completed: [] | [boolean];
};
