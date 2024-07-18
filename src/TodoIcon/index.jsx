import CheckSVG from '../assets/check.svg?react';
import DeleteSVG from '../assets/delete.svg?react';
import EditSVG from '../assets/edit.svg?react';
import React from 'react';
import './TodoIcon.css';

const iconTypes = {
  "check": (color) => <CheckSVG className="Icon-svg" fill={color} />,
  "delete": (color) => <DeleteSVG className="Icon-svg" fill={color} />,
  "edit": (color) => <EditSVG className="Icon-svg" fill={color} />,
};

function TodoIcon({ type, color, onClick }) {
  return (
    <span
      className={`Icon-container Icon-container-${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  )
}

export { TodoIcon };