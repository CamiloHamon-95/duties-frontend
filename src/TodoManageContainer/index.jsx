import React from 'react'
import './TodoManageContainer.css';

function TodoManageContainer({ children }) {
  
  return (
    <section className="TodoManageContainer">
      <div className='title-app'>
        <h1>Home duties</h1>
      </div>
      { children }
    </section>
  );
}

export { TodoManageContainer };