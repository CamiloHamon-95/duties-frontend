import axios from 'axios';
import React from 'react';

// DOCKER CONFIG
// const BACKEND_URL = 'http://3.141.107.247:5000/api/duties' || 'http://localhost:5000/api/duties' || 'http://backend-duties:5000/api/duties';
// const BACKEND_URL = 'http://localhost/project1/backend/';
const BACKEND_URL = 'http://localhost:8000/api/duties';

function useMongoDBconection(initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => { 
    setTimeout(() => {
      const source = axios.CancelToken.source(); 
      const fetchData = async () => { 
        try 
        { 
          const res = await axios.get(BACKEND_URL, { cancelToken: source.token, });
          const responseBackend = res.data;
          console.log(responseBackend);
          if(responseBackend['status_code'] === 200){
            const dutiesList = responseBackend['response'];

            const updatedDutiesList = dutiesList.map(duty => {
              // Clonar el diccionario actual para no modificar el original
              const updatedDuty = { ...duty };
              // Modificar la key 'datetime_start' en el diccionario clonado
              updatedDuty.datetime_start = DrawDates(duty['datetime_start']); // Aquí asigna el nuevo valor que desees
              updatedDuty.datetime_end = DrawDates(duty['datetime_end']);
              return updatedDuty;
            });
            setItem(updatedDutiesList);
            setLoading(false);
          }
        } 
        catch (err) 
        { 
          if (axios.isCancel(err)) { 
            console.log('Request canceled', err.message); 
          } else { setError(err); setLoading(false); } 
        } 
      }; 
      
      fetchData(); 
      
      return () => { 
        source.cancel('Component unmounted'); 
      }; 
    }, 2000);
  }, []);

  const createNewItem = (newDutiesList) => {

    const newDuty = { ...newDutiesList[newDutiesList.length - 1] };

    newDuty['datetime_start'] = ConvertirFechaISOATimestamp(newDuty['datetime_start']);
    newDuty['datetime_end'] = ConvertirFechaISOATimestamp(newDuty['datetime_end']);

    if (newDuty.hasOwnProperty('id')) {
      delete newDuty.id;
    }
  
    axios.post(BACKEND_URL, newDuty)
      .then(response => {
        var responseJson = response.data;
        console.log(responseJson);
        if(responseJson.status_code === 201){
          newDutiesList[newDutiesList.length - 1]['id']  = responseJson['response']['id'];
          setItem(newDutiesList);
        }
      })
      .catch(err => {
        if (axios.isCancel(err)) { 
          console.log('Post canceled', err.message); 
        } else { setError(err); setLoading(false); } 
        console.error('Error:', error);
      });
  };

  const modifyItem = (modifiedTodo, newDutiesList) => {

    var idTodo = String(modifiedTodo['id']);
    delete modifiedTodo.id;
    modifiedTodo['datetime_start'] = ConvertirFechaISOATimestamp(modifiedTodo['datetime_start']);
    modifiedTodo['datetime_end'] = ConvertirFechaISOATimestamp(modifiedTodo['datetime_end']);
    axios.put(BACKEND_URL+'/'+idTodo, modifiedTodo)
      .then(response => {
        modifiedTodo['id'] = idTodo;
        var responseJson = response.data;
        console.log(responseJson);
        if(responseJson.status_code === 200){
          setItem(newDutiesList);
        }
      })
      .catch(err => {
        if (axios.isCancel(err)) { 
          console.log('Put canceled', err.message); 
        } else { setError(err); setLoading(false); } 
        console.error('Error:', error);
      });
  };

  const deleteItem = (id, newDutiesList) => {

    var linkDelete = BACKEND_URL+'/'+id;
    axios.delete(linkDelete)
      .then(response => {
        var responseJson = response.data;
        if(responseJson.status_code === 200){
          console.log(responseJson);
          setItem(newDutiesList);
        }
      })
      .catch(err => {
        if (axios.isCancel(err)) { 
          console.log('Delete canceled', err.message); 
        } else { setError(err); setLoading(false); } 
        console.error('Error:', error);
      });
  };

  return {
    item,
    createNewItem,
    modifyItem,
    deleteItem,
    loading,
    error,
  };
}

function DrawDates(timestamp){

  const adjustedDate = new Date(timestamp * 1000);

  // Obtener las partes de la fecha y hora
  const year = adjustedDate.getFullYear();
  const mes = ('0' + (adjustedDate.getMonth() + 1)).slice(-2); // Agregar un 0 inicial si el mes es menor que 10
  const dia = ('0' + adjustedDate.getDate()).slice(-2); // Agregar un 0 inicial si el día es menor que 10
  const hora = ('0' + adjustedDate.getHours()).slice(-2); // Agregar un 0 inicial si la hora es menor que 10
  const minutos = ('0' + adjustedDate.getMinutes()).slice(-2); // Agregar un 0 inicial si los minutos son menores que 10
  const segundos = ('0' + adjustedDate.getSeconds()).slice(-2); // Agregar un 0 inicial si los segundos son menores que 10
  
  // Construir la cadena en el formato deseado
  const fechaFormateada = `${year}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;

  return fechaFormateada;
}

function ConvertirFechaISOATimestamp(fechaInput) {

  var fechaUTC = new Date(fechaInput);
  
  const timestamp = Math.floor(fechaUTC.getTime() / 1000);

  return timestamp;
}

export { useMongoDBconection };
