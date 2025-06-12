import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/`;
const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { register, login, logout };
