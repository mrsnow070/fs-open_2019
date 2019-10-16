import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;

export const setToken = newToken => token = `bearer ${newToken}`;

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)

  return response
}

export const putLike = async (id, like) => {
  const response = await axios.put(`${baseUrl}/${id}`, like)

  return response;
}

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}


