import './TodoItem.css';

import type { TodoItemType } from 'shared/src/todos';
// import { backend } from '../declarations/backend';

type Props = {
  item: TodoItemType;
  onToggleCompleted: () => void;
};

export const TodoItem: React.FC<Props> = ({ item, onToggleCompleted }) => {
  const handleToggleCompletion = () => {
    // Logic to toggle completion status
    // This could involve calling a backend function to update the todo item
    onToggleCompleted();
  };

  return (
    <div className="todo-item-container">
      <h3>{item.content}</h3>
      <p>ID: {item.id}</p>
      <p>Created At: {item.createdAt}</p>
      <label htmlFor={`todo-${item.id}`}>
        Completed:
        <input
          type="checkbox"
          id={`todo-${item.id}`}
          checked={item.completed}
          onChange={handleToggleCompletion}
        />
      </label>
    </div>
  );
};
