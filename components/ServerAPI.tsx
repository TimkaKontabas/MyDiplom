import {useContext} from 'react';
import {
  URL_SERVER
} from '@env';
console.log(URL_SERVER, "24"); // Количество подключений к ноуту
import {MainContext} from "../MainContext";


export const getServerData = (needUpdate, setNeedUpdate, setData, path, onError=null, body=null) =>  {
  const mainObject = useContext(MainContext);
  let params = body ? body : { };
  let url;
  if (mainObject.getURL_SERVER()){
    url = mainObject.getURL_SERVER();
  } else url = URL_SERVER;

  if (needUpdate)
  fetch(url + "getData/" + path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  .then(response => response.json())
  .then(data => {
    setData(data);
    setNeedUpdate(false);
  })
  .catch(
    function (error) {
      if (onError)
        onError(error)
      else
        console.log(error);
    }
  );
}

export const sendServerData = (path, params, answerHandler=null, onError=null, mainObject=null) =>  {
  let url;
  if (mainObject.getURL_SERVER()){
    url = mainObject.getURL_SERVER();
  } else url = URL_SERVER;

  fetch(url + "sendData/" + path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  .then(response => response.json())
  .then(data => {
    if (answerHandler)
      answerHandler(data);
    else
      console.log(data);
  })
  .catch(
    function (error) {
      if (onError)
        onError(error)
      else
        console.log(error);
    }
  );
}