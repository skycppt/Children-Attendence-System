import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://attendance-backend-d64z.onrender.com/api",
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