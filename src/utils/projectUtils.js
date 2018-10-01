import axios from 'axios';
import { showInfo } from './alertUtils';
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from '../constants';

const { API_URL } = process.env;

export const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const removeProject = async (projectId) => {
  const response = await axios.delete(`${API_URL}/projects/${projectId}`);
  return response.message;
};

// TODO implement below functions in Admin.js

export const putProject = async (projectId, projectClient, projectName) => {
  const response = await axios.put(`${API_URL}/projects/${projectId}`, { client: projectClient, name: projectName });
  return response.data;
};

export const createProject = async (projectClient, projectName) => {
  const response = await axios.post(`${API_URL}/projects/`, { client: projectClient, name: projectName });
  return response;
};

export const updateNotification = () => showInfo(UPDATE_PROJECT);
export const createNotification = () => showInfo(CREATE_PROJECT);
export const deleteNotification = () => showInfo(DELETE_PROJECT);
