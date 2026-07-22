import express from "express";
import { getTodayStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/today", getTodayStats);

export default router;