import { getToken } from '../utils/helper';

async function addTask(description) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());
  myHeaders.append("Content-Type", "application/json");

  const url = "https://api-nodejs-todolist.herokuapp.com/task"
  return fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(description)
  })
    .then(data => data.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}
export default addTask