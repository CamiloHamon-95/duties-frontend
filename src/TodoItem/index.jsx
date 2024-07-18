import { CompleteIcon } from '../TodoIcon/CompleteIcon';
import { DeleteIcon } from '../TodoIcon/DeleteIcon';
import { TodoItemContent } from '../TodoItemContent';
import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <CompleteIcon
        completed={props.completed}
        onComplete={props.onComplete}
      />

      <TodoItemContent
        title={props.title}
        description={props.description}
        datetime_start={props.datetime_start}
        datetime_end={props.datetime_end}
        completed={props.completed}
      />

      <DeleteIcon
        onDelete={props.onDelete}
      />
    </li>
  );
}

export { TodoItem };