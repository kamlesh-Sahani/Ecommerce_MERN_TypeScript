import express from "express";
import { getDashboardStats, getPieChart } from "../Controllers/stats.js";

const router = express.Router();

router.get('/stats',getDashboardStats);
// piechart
router.get('/pie',getPieChart);
export default router;