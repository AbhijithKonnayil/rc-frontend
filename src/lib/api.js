import axios from "axios";
import AuthService from "../services/authServices";


const API_URL = 'http://127.0.0.1:8000/'; // Replace with your API base URL

// Function to handle errors
const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

// Function to make a GET request
export const get = async (endpoint, params = {}) => {
  try {
    const token = `Token ${AuthService.getToken()}`;
    console.log(token);
    const response = await axios.get(`${API_URL}${endpoint}`, { headers: { Authorization: `${token}` },params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make a POST request
export const post = async (endpoint, data = {}) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make a PATCH request
export const patch = async (endpoint, data = {}) => {
  try {
    const response = await axios.patch(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make a PUT request
export const put = async (endpoint, data = {}) => {
  try {
    const response = await axios.put(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make a DELETE request
export const remove = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
