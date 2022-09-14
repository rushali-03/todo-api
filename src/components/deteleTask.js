import { getToken } from '../utils/helper';

async function deleteTask(task) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`https://api-nodejs-todolist.herokuapp.com/task/${task._id}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}
export default deleteTask;