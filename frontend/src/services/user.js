import axios from 'axios';
const baseUrl = '/api/users';

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

const signUp = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const updateProfile = async (id, update) => {
  let response = null;
  if (update.type === 'Name') {
    response = await axios.put(
      `${baseUrl}/${id}/name`,
      update.content,
      getConfig()
    );
  } else if (update.type === 'Username') {
    response = await axios.put(
      `${baseUrl}/${id}/username`,
      update.content,
      getConfig()
    );
  }
  return response.data;
};

export default { getAll, setToken, signUp, updateProfile };
