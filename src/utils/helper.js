import * as R from 'ramda';

export const getToken = () => {
  const tokenString = localStorage.getItem('token') === undefined? null : localStorage.getItem('token');
  const userToken = JSON.parse(tokenString) || {};
  return userToken
};
export const setToken = userToken => {
  localStorage.setItem('token', JSON.stringify(userToken));
};
export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);