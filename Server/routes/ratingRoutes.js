import express from 'express';
const router=express.Router();
import { verifyToken} from '../middleware/verifyToken';
import { postAllRating } from '../controllers/ratingController';

router.post('/rating',verifyToken,postAllRating)

export default router;