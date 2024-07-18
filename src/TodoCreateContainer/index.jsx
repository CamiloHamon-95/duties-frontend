import React from 'react'
import './TodoCreateContainer.css';

function TodoCreateContainer({ children }) {
  
  return (
    <section className="TodoCreateContainer">
      { children }
    </section>
  );
}

export { TodoCreateContainer };