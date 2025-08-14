import {
  IDL,
  query,
  time,
  trap,
  update,
  StableBTreeMap,
  postUpgrade,
  init,
} from 'azle';
import type {
  TodoItemType,
  TodoItemIdType,
  UpdateTodoItemInputType,
} from 'shared/src/todos';

const TodoItem = IDL.Record({
  id: IDL.Nat32,
  content: IDL.Text,
  completed: IDL.Bool,
  createdAt: IDL.Text,
});
const UpdateTodoItemInput = IDL.Record({
  id: IDL.Nat32,
  completed: IDL.Opt(IDL.Bool),
});

export default class {
  todos: StableBTreeMap<TodoItemIdType, TodoItemType> = new StableBTreeMap(0);

  get todosCount(): number {
    return this.todos.len();
  }

  @init()
  @postUpgrade()
  initMessage(): void {
    console.log(`Todos count = ${this.todosCount}`);
  }

  @query([], IDL.Vec(TodoItem))
  listTodos(): Array<TodoItemType> {
    return Array.from(this.todos.values());
  }

  @query([IDL.Text], TodoItem)
  getTodo(id: TodoItemIdType): TodoItemType {
    const todo = this.todos.get(id);
    if (!todo) {
      trap(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @update([IDL.Text], IDL.Nat32)
  createTodo(content: string): TodoItemIdType {
    this.validateTodoContent(content);

    const id = this.randomId();
    const newTodo = {
      id,
      content,
      completed: false,
      createdAt: this.currentDate().toISOString(),
    };

    this.todos.insert(id, newTodo);
    console.log(`New todos count: ${this.todosCount}`);

    return id;
  }

  @update([UpdateTodoItemInput])
  updateTodo(input: UpdateTodoItemInputType): void {
    const todoItem = this.getTodo(input.id);

    if (input.completed[0] !== undefined) {
      todoItem.completed = input.completed[0];
    }

    this.todos.insert(input.id, todoItem);
  }

  randomId(): number {
    // NOTE: this is not cryptographically secure randomness
    // but sufficient for generating unique IDs in this context
    return Math.floor(Math.random() * 1_000_000_000);
  }

  validateTodoContent(text: string): void {
    if (text.length === 0) {
      trap('Todo text cannot be empty');
    }
    if (text.length > 100) {
      trap('Todo text cannot exceed 100 characters');
    }
  }

  currentDate(): Date {
    const nanos = time();
    return new Date(Number(nanos / BigInt(1_000_000)));
  }
}
