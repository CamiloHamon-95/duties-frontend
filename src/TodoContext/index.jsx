import React from 'react';
//import { useLocalStorage } from './useLocalStorage';
import { useMongoDBconection } from './useMongoDBconection'; 

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    item: todos,
    createNewItem,
    modifyItem,
    deleteItem,
    loading,
    error,
  } = useMongoDBconection([]); 
  //useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const [dateFilter, setDateFilter] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;

  const totalTodos = todos.length;

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.title.toLowerCase();
      const todoDateStart = todo.datetime_start;
      const dateDuty = new Date(todoDateStart);
      dateFilter.startDate.setHours(0);
      dateFilter.startDate.setMinutes(0);
      dateFilter.endDate.setHours(23);
      dateFilter.endDate.setMinutes(59);
      if(dateFilter.startDate <= dateDuty && dateFilter.endDate >= dateDuty){
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      }
      else{
        return false;
      }
    }
  );

  const addTodo = (newDuty) => {
    const newTodos = [...todos];
    newTodos.push(newDuty);
    createNewItem(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.id === id
    );
    newTodos[todoIndex].completed = true;

    const copiedTodo = { ...newTodos[todoIndex] };
    
    modifyItem(copiedTodo, newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.id === id
    );
    newTodos.splice(todoIndex, 1);
    deleteItem(id,newTodos);
  };
  
  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
      dateFilter,
      setDateFilter,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
