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
import { v4 as uuidV4 } from 'uuid';

const TodoItemId = IDL.Text;

const TodoItem = IDL.Record({
  id: TodoItemId,
  content: IDL.Text,
  completed: IDL.Bool,
  createdAt: IDL.Text,
});

const UpdateTodoItemInput = IDL.Record({
  id: TodoItemId,
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

  @query([TodoItemId], TodoItem)
  getTodo(id: TodoItemIdType): TodoItemType {
    const todo = this.todos.get(id);
    if (!todo) {
      trap(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @update([IDL.Text], TodoItemId)
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
  updateTodo(input: UpdateTodoItemInputType) {
    const todo = this.getTodo(input.id);

    if (input.completed[0] !== undefined) {
      todo.completed = input.completed[0];
    }

    this.todos.insert(input.id, todo);
  }

  randomId(): string {
    return uuidV4();
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
