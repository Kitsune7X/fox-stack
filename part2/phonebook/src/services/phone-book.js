import axios from 'axios';

const baseUrl = 'api/persons';

// Fetch data from server
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// Add new contact to server
const create = (newContact) => {
  return axios
    .post(baseUrl, newContact)
    .then((response) => response.data);
};

// Delete contact
const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data);
};

// Update number
const updateNumber = (id, newNumber) => {
  return axios
    .put(`${baseUrl}/${id}`, newNumber)
    .then((response) => response.data);
};

export default { getAll, create, remove, updateNumber };
