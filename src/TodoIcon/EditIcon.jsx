import React from 'react';
import { TodoIcon } from '.';

function DeleteIcon({ onDelete }) {
  return (
    <TodoIcon
      type="edit"
      color="gray"
      onClick={onDelete}
    />
  );
}

export { DeleteIcon };
