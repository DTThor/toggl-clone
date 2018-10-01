import axios from 'axios';
import { setUser } from './userUtils';

const { API_GITHUB_URL, API_URL } = process.env;

export const handleGithubLogin = async (response) => {
  const result = await axios.post(API_GITHUB_URL, response);
  return result;
};


export const loginAuth = (email, password) => (
  new Promise((resolve, reject) => {
    axios.post(`${API_URL}/login`, { email, password })
      .then(({ data }) => {
        setUser(data.token, data.user);
        resolve(data);
      })
      .catch(error => reject(error));
  })
);
