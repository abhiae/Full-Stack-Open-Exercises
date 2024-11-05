import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  // It is initially a request which is not yet resolved into response
  // so it is semantically more accurate to use request instead of response
  // after then callback we eventually have response
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = (newBlogObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.post(baseUrl, newBlogObject, config);
  return request.then((response) => response.data);
};

const updateLike = (id, updatedBlogObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlogObject);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then(console.log('blog deleted succesfully'));
};

export default { getAll, setToken, addBlog, updateLike, deleteBlog };
