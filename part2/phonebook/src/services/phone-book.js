import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

// Fetch data from server
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// Add new contact to server
const create = (newContact) => {
  return axios.post(baseUrl, newContact).then((response) => response.data);
};

export default { getAll, create };
