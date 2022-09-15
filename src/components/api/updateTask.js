import { getToken } from '../../utils/helper';

async function updateTask(credentials, task) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());
  myHeaders.append("Content-Type", "application/json");

  const url = `https://api-nodejs-todolist.herokuapp.com/task/${task._id}`
  return fetch(url, {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .then(result => result )
    .catch(error => console.log('error', error));
}
export default updateTask