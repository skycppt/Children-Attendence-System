import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://attendance-backend-d64z.onrender.com/api",
});

export const getSummaryReport = async (group = "All") => {
  const response = await API.get("/reports/summary", {
    params: { group },
  });

  return response.data;
};

export const getDashboardSummary = async () => {
  const response = await API.get("/reports/dashboard");

  return response.data;
};

export const getMonthlyReport = async (group = "All", month = "") => {
  const response = await API.get("/reports/monthly", {
    params: {
      group,
      month,
    },
  });

  return response.data;
};

export const getTopPerformers = async (
  group = "All",
  limit = 3,
  month = ""
) => {
  const response = await API.get("/reports/top", {
    params: {
      group,
      limit,
      month,
    },
  });

  return response.data;
};

export const getStudentReport = async (
  rollNo,
  month = ""
) => {
  const response = await API.get(
    `/reports/student/${rollNo}`,
    {
      params: { month },
    }
  );

  return response.data.student;
};

export const getTop3ByGroup = async (month = "") => {
  const groups = ["Junior", "Senior", "Youth"];

  const result = {};

  for (const group of groups) {
    const response = await getTopPerformers(group, 3, month);
    result[group] = response.students || [];
  }

  return result;
};