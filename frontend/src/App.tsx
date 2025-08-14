import { useEffect, useState } from 'react';
import { backend } from './declarations/backend';
import type { TodoItemType } from 'shared/src/todos';
import { TodoItem } from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  function listTodos() {
    backend.listTodos().then(setTodos);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formInput = (event.target as HTMLFormElement).elements.namedItem(
      'todoContent',
    ) as HTMLInputElement;
    const todoContent = formInput.value;
    await backend.createTodo(todoContent).then(listTodos);
    formInput.value = ''; // Clear input after submission
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <main>
      <img src="/onchain.svg" alt="100% onchain on the Internet Computer" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="todoContent">Enter your TODO content: &nbsp;</label>
        <input id="todoContent" alt="Todo Content" type="text" />
        <button type="submit">Add Todo</button>
      </form>
      {todos.length > 0 ? (
        <div>
          <h2>Todo List</h2>
          {todos.map(item => (
            <TodoItem key={item.id} item={item} onToggleCompleted={listTodos} />
          ))}
        </div>
      ) : (
        <p>No todos available. Add some!</p>
      )}
    </main>
  );
}

export default App;
