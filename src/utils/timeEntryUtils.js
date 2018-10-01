import axios from 'axios';

const { API_URL } = process.env;

export const createTimeEntry = (userId, timeStart, timeEnd, record) => {
  const userTimeObj = { userId, timeStart, timeEnd };
  return Object.assign(userTimeObj, record);
};

export const setTimeStartInLocalStorage = timeStart =>
  localStorage.setItem('timeStart', JSON.stringify(timeStart));

export const getTimeStartFromLocalStorage = () => JSON.parse(localStorage.getItem('timeStart'));

export const removeTimeStartFromLocalStorage = () => localStorage.removeItem('timeStart');

export const setRecordInLocalStorage = record =>
  localStorage.setItem('record', JSON.stringify(record));

export const getRecordFromLocalStorage = () => JSON.parse(localStorage.getItem('record'));

export const removeRecordFromLocalStorage = () => localStorage.removeItem('record');

export const fetchTimeEntries = async (user) => {
  const response = await axios.get(`${API_URL}/entries`, { params: { id: user } });
  return response.data;
};

export const postTimeEntry = async (timeEntry) => {
  const response = await axios.post(`${API_URL}/entries`, timeEntry);
  return response.data;
};
