import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodayStats = async () => {
  const response = await API.get("/dashboard/today");
  return response.data;
};