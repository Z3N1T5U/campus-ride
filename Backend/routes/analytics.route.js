import express from "express";
import { getAnalyticsDashboard }
from "../controllers/analytics.controller.js";

const router = express.Router();

router.get(
    "/dashboard",
    getAnalyticsDashboard
);

export default router;