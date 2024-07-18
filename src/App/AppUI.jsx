import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoDatesFilter } from '../TodoDatesFilter';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoForm } from '../TodoForm';
import { Modal } from '../Modal';
import { TodoContext } from '../TodoContext';
import { TodoManageContainer } from '../TodoManageContainer';
import { TodoCreateContainer } from '../TodoCreateContainer';

function AppUI() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);
  
  return (
    <>
      <TodoManageContainer>
        <TodoCounter />
        <TodoSearch />
        <TodoDatesFilter />

        <TodoList>
          {loading && (
            <>
              <TodosLoading />
              <TodosLoading />
              <TodosLoading />
            </>
          )}
          {error && <TodosError/>}
          {(!loading && searchedTodos.length === 0) && <EmptyTodos />}

          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              datetime_start={todo.datetime_start}
              datetime_end={todo.datetime_end}
              onComplete={() => completeTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </TodoList>
        
        <CreateTodoButton
          setOpenModal={setOpenModal}
        />
      </TodoManageContainer>
      <TodoCreateContainer>
        <TodoForm />
      </TodoCreateContainer>

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}
    </>
  );
}

export { AppUI };
