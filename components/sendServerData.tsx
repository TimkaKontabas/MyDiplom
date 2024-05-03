import {
  URL_SERVER
} from '@env';
console.log(URL_SERVER, "1");


export const sendServerData = (path, params, answerHandler=null, onError=null) =>  {

  fetch(URL_SERVER + path, {
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
