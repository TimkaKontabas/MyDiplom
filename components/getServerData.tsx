import {
  URL_SERVER
} from '@env';
console.log(URL_SERVER);

const getServerData = (needUpdate, setNeedUpdate, setData, path) =>  {
  console.log(URL_SERVER + path);
  if (needUpdate[path])
  fetch(URL_SERVER + path, {
    method: 'Get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {console.log(data, data.length);
    setData(data);
    needUpdate[path] = false;
    setNeedUpdate(needUpdate);
  })
  .catch(
    function (error) {
      console.log(error);
    }
  );
}

export {getServerData};