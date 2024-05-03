import {
  URL_SERVER
} from '@env';
console.log(URL_SERVER, "2");


export const getServerData = (needUpdate, setNeedUpdate, setData, path, onError=null, body=null) =>  {
  let params = body ? body : { };

  if (needUpdate)
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
