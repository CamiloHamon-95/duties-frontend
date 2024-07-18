import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';

function TodoForm() {

  const myForm = React.useRef();

  const {
    addTodo,
    setOpenModal,
  } = React.useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = React.useState({});

  const onSubmit = (event) => {
    console.log(event.target.id);
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
    myForm.current.reset();
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onChange = (event) => {
    const idName = event.target.id;
    const value = event.target.value;
    var key = '1';
    if(idName === 'input-form-title'){
      key = 'title';
    }
    else if(idName === 'date-form-start'){
        key = 'datetime_start';
    }
    else if(idName === 'date-form-end'){
        key = 'datetime_end';
    }
    else if(idName === 'text-form-description'){
        key = 'description';
    }

    setNewTodoValue(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <form ref={myForm} onSubmit={onSubmit}>
      <div className='title-form'>
        Create a new dutie
      </div>
      <div className='input-box'>
        <span className='details'>Title:</span>
        <input
          id='input-form-title'
          onChange={onChange}
          placeholder='Write the duty title...'
          defaultValue=''
          required
        />
      </div>
      <div className='input-box'>
        <span className='details'>Start:</span>
        <input 
          id='date-form-start'
          type='datetime-local'
          onChange={onChange}
          defaultValue=''
          required
        />
      </div>
      <div className='input-box'>
        <span className='details'>End:</span>
        <input 
          id='date-form-end' 
          type='datetime-local'
          onChange={onChange}
          required
        />
      </div>
      <div className='input-box'>
        <span className='details'>Description:</span>
        <textarea
          id='text-form-description'
          placeholder="Typing the duty description..."
          onChange={onChange}
          required
        />
      </div>
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >Close</button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >Add</button>
      </div>
    </form>
  );
}

export { TodoForm };
