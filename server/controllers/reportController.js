import {
  getSummaryReport,
  getMonthlyReport,
  getTopPerformers,
  getStudentReport,
  getDashboardSummary,
} from "../services/reportService.js";

export const generateReport = async (req, res) => {
  try {
    const { group = "All" } = req.query;

    const report = await getSummaryReport(group);

    res.json({
      success: true,
      ...report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const monthlyReport = async (req, res) => {
  try {
    const { group = "All", month } = req.query;

    const report = await getMonthlyReport(group, month);

    res.json({
      success: true,
      students: report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const topPerformers = async (req, res) => {
  try {
    const {
      group = "All",
      limit = 3,
      month,
    } = req.query;

    const report = await getTopPerformers(
      group,
      Number(limit),
      month
    );

    res.json({
      success: true,
      students: report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const studentReport = async (req, res) => {
  try {
    const report = await getStudentReport(
      req.params.rollNo,
      req.query.month
    );

    res.json({
      success: true,
      student: report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const dashboardSummary = async (req, res) => {
  try {
    const report = await getDashboardSummary();

    res.json({
      success: true,
      ...report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};