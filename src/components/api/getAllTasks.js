import { getToken } from '../../utils/helper';

async function getAllTasks(setLoadingAllTasks, mode) {
  setLoadingAllTasks(current => !current);

  const url = (mode==='all')? ("https://api-nodejs-todolist.herokuapp.com/task") : 
  (mode==='active' ? "https://api-nodejs-todolist.herokuapp.com/task?completed=false" : 
  "https://api-nodejs-todolist.herokuapp.com/task?completed=true")
  
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => { setLoadingAllTasks(current => !current); return result })
    .catch(error => { console.log('error', error); setLoadingAllTasks(current => !current); });
}
export default getAllTasks;