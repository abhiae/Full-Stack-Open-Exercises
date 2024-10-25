import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newContactObject) => {
  const request = axios.post(baseUrl, newContactObject);
  return request.then((response) => response.data);
};

const update = (updatedContactObject) => {
  const request = axios.put(
    `${baseUrl}/${updatedContactObject.id}`,
    updatedContactObject
  );
  return request.then((response) => response.data);
};
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    console.log("contact deleted successfully");
  });
};

export default { getAll, create, update, remove };
