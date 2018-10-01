import axios from 'axios';

const { API_URL } = process.env;

export const requestProjects = () => (
  { type: 'REQUEST_PROJECTS' }
);

export const receiveProjects = data => (
  {
    type: 'RECEIVE_PROJECTS',
    projects: data,
    receivedAt: Date.now(),
  }
);

export const fetchProjects = () => (
  (dispatch) => {
    dispatch(requestProjects());
    return axios.get(`${API_URL}/projects`)
      .then(({ data }) => dispatch(receiveProjects(data)));
  }
);

export const receiveCategories = () => (
  { type: 'RECEIVE_CATEGORIES' }
);

export const requestEntries = () => (
  { type: 'REQUEST_ENTRIES' }
);

export const receiveEntries = data => (
  {
    type: 'RECEIVE_ENTRIES',
    timeEntries: data,
    receivedAt: Date.now(),
  }
);

export const fetchEntries = user => (
  (dispatch) => {
    dispatch(requestEntries());
    return axios.get(`${API_URL}/entries`, { params: { id: user } })
      .then(({ data }) => dispatch(receiveEntries(data)));
  }
);
