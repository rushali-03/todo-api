async function verifyUser(credentials, type, setLoading) {
  setLoading(current => !current);

  const url = type==='login'? 'https://api-nodejs-todolist.herokuapp.com/user/login' : 
  'https://api-nodejs-todolist.herokuapp.com/user/register';
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' //think of a better name
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .then(result => {setLoading(current => !current); return result})
    .catch(error => {console.log(error); setLoading(current => !current);})
}
export default verifyUser
