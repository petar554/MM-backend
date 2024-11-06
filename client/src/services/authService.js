import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });

    const { user, token } = response.data;

    localStorage.setItem('jwtToken', token);
    return user;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { user, token } = response.data;

  localStorage.setItem('jwtToken', token);

  return user;
};  

export const loginWithGoogle = async (idToken) => {
  const response = await axios.post(`${API_URL}/login/google`, { idToken });
  const { user, token } = response.data;

  localStorage.setItem('jwtToken', token);

  return user;
};

export const logoutUser = () => {
    localStorage.removeItem('jwtToken');
};