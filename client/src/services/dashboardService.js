import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://attendance-backend-d64z.onrender.com/api",
});

export const getTodayStats = async () => {
  const response = await API.get("/dashboard/today");
  return response.data;
};