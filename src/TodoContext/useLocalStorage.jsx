import axios from 'axios';
import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => {
    setTimeout(() => {
      try {

        const localStorageItem = localStorage.getItem(itemName);
    
        let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          console.log(parsedItem);
          setItem(parsedItem);
        }
  
        setLoading(false);
      } catch(error) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };
