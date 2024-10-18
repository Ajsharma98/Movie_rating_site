import express from 'express';
const router = express.Router();// creating the instance of route from express
// import movieController from '../controllers/movieController.js'// importing the moviecontroller module file here 
import  {verifyToken}  from '../middleware/verifyToken.js';
import { deleteMovieById, getAllMovies, postAllMovies } from '../controllers/movieController.js';
import { deleteRatingById } from '../controllers/ratingController.js';


// Route to get all books with optional pagination
router.get('/', verifyToken, getAllMovies); //for route get first it will exceute the verifyToken function and after then getAllBooks function
// Route to add a new book
router.post('/add', verifyToken, postAllMovies); //for route post at /add first it will go inside the verifyToken function then at verifyAdmin function and at last postAllBook function 
router.delete('/:id', verifyToken, deleteMovieById);


export default router;