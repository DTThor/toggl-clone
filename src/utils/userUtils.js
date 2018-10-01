import axios from 'axios';

const { API_URL } = process.env;

export const getUser = () => JSON.parse(localStorage.getItem('jwt')) || JSON.parse(localStorage.getItem('user')) || {};

export const getUserIdFromLocalStorage = () => {
  const user = getUser();
  return user && user._id;
};

export const getToken = () => axios.get(`${API_URL}/users`, { headers: { Authorization: `Token ${getUser().token ? getUser().token : ''}` } });


export const setUser = (token, user) => {
  localStorage.setItem('jwt', JSON.stringify(token, user));
};

export const setGithubUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
};

export const userIsValidated = () => {
  const githubUser = JSON.parse(localStorage.getItem('user'));
  const user = JSON.parse(localStorage.getItem('jwt'));
  return !!(user || githubUser);
};
