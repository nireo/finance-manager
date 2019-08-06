import axios from 'axios';
const baseUrl = '/api/expenses';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const deleteExpense = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const createExpense = async newObject => {
  const response = await axios.post(`${baseUrl}`, newObject, getConfig());
  return response.data;
};

export default { setToken, getAll, deleteExpense, createExpense };
