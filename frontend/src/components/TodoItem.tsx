import './TodoItem.css';

import { useState } from 'react';
import type { TodoItemType } from 'shared/src/todos';
import { backend } from '../declarations/backend';

type Props = {
  item: TodoItemType;
  onToggleCompleted: () => void;
};

export const TodoItem: React.FC<Props> = ({ item, onToggleCompleted }) => {
  const [updating, setUpdating] = useState(false);

  const handleToggleCompletion = async () => {
    setUpdating(true);
    await backend.updateTodo({
      id: item.id,
      completed: [!item.completed],
    });
    onToggleCompleted();
    setUpdating(false);
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
          disabled={updating}
        />
      </label>
    </div>
  );
};
