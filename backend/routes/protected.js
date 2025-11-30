import express from "express";
import { protectedData } from "../controllers/protectedController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, protectedData);

export default router;