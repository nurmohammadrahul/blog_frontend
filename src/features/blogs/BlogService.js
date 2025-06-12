import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/blogs/`;

const getBlogs = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};
const createBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, blogData, config);
    return response.data;
};

const updateBlog = async (id, blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_URL}${id}`, blogData, config);
    return response.data;
};
const getMyBlogs = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    const response = await axios.get(API_URL + "myblogs", config);
    return response.data;
  };
export default {
    getBlogs,
    createBlog,
    updateBlog,
    getMyBlogs,
};
