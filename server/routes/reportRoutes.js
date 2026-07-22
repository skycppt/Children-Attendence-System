import express from "express";
import {
  generateReport,
  monthlyReport,
  topPerformers,
  studentReport,
  dashboardSummary,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/summary", generateReport);
router.get("/dashboard", dashboardSummary);
router.get("/monthly", monthlyReport);
router.get("/top", topPerformers);
router.get("/student/:rollNo", studentReport);

export default router;