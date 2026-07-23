import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://attendance-backend-d64z.onrender.com/api",
});

export default api;