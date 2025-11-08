import express from "express";
import artisansRoutes from "./artisans.js";

const router = express.Router();
router.use("/artisans", artisansRoutes);

export default router;
