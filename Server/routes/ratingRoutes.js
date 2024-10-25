import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import {
  postAllRating,
  deleteRatingById,
  getAllRating,
  getRatingById,
} from "../controllers/ratingController.js";

router.get("/", verifyToken, getAllRating);
router.post("/add", verifyToken, postAllRating);
router.delete("/:Review_id", verifyToken, deleteRatingById);
router.get("/:Review_id", verifyToken, getRatingById);
export default router;
