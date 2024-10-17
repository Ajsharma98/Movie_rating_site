import express from 'express';
const router=express.Router();
import { verifyToken} from '../middleware/verifyToken.js';
import { postAllRating } from '../controllers/ratingController.js';

router.post('/rating',verifyToken, postAllRating)

export default router;