// src/lib/axios.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // penting untuk Sanctum
    "Accept": "application/json",
  },
});

export default axiosClient;
