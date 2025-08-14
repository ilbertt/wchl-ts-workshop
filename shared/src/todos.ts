export type TodoItemIdType = number;

export type TodoItemType = {
  id: TodoItemIdType;
  content: string;
  completed: boolean;
  createdAt: string;
};
