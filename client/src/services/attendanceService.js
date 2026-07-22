import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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