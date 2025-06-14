// src/api/axiosInstance.js
import axios from "axios";

const API_BASE_URL = "https://glane-assignment.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add token from localStorage to headers automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
