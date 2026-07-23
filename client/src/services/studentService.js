import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://attendance-backend-d64z.onrender.com/api",
});

export const getStudents = async (group, search) => {
  const response = await API.get("/students", {
    params: { group, search },
  });

  return response.data;
};

export const markAttendance = async (student) => {
  const response = await API.post("/attendance", student);
  return response.data;
};

