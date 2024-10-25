import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import { getRatingforMovieById } from "../controllers/ratingController.js";
router.get("/:movie_id", verifyToken, getRatingforMovieById);
export default router;
