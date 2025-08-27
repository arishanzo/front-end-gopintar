// src/lib/axios.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // penting untuk Sanctum
    "Accept": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});


// Auto-detect content type
axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

   config.withCredentials = true; 
  return config;
});


export default axiosClient;
