import axios from 'axios';
import api from './apiConstants';

// for server routes that need authorization we send the JWT in the authorisation header
export const getHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const loginUser = (email, password) => {
  console.log('Login user to ', api.LOGIN_USER);
  return axios.post(api.LOGIN_USER, { email, password });
};

export const registerUser = (email, password) => {
  return axios.post(api.REGISTER_USER, { email, password });
};

export const getTodos = () => {
  return axios.get(api.GET_TODOS, { headers: getHeader() });
};

export const addTodo = (title, notes, dueDate) => {
  return axios.post(
    api.ADD_TODO,
    { title, notes, dueDate },
    { headers: getHeader() }
  );
};

export const editTodo = (id, title, notes, completed) => {
  return axios.put(
    api.EDIT_TODO,
    { id, title, notes, completed },
    { headers: getHeader() }
  );
};

export const deleteTodo = id => {
  return axios.delete(api.DELETE_TODO, { data: { id }, headers: getHeader() });
};
