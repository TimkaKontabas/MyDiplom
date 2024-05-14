import {
  URL_SERVER
} from '@env';
console.log(URL_SERVER, "13");


export const getServerData = (needUpdate, setNeedUpdate, setData, path, onError=null, body=null) =>  {
  let params = body ? body : { };

  if (needUpdate)
  fetch(URL_SERVER + "getData/" + path, {
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

export const sendServerData = (path, params, answerHandler=null, onError=null) =>  {

  fetch(URL_SERVER + "sendData/" + path, {
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