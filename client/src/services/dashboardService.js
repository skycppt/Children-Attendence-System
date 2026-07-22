import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTodayStats = async () => {
  const response = await API.get("/dashboard/today");
  return response.data;
};