import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_URL,
});

export const searchStudents = async (group, search) => {
  const response = await API.get("/students", {
    params: {
      group,
      search,
    },
  });

  return response.data;
};