import express from 'express'
const router = express.Router();// creating the instance of route 
// import loginController from '../controllers/loginController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import {signupUsers, loginUsers, logoutUsers, deleleteUserByid, getAllUser, getUserById, getMovieandRatingByUserId} from '../controllers/loginController.js'// importing the loginController
// Route for user login
router.post('/login', loginUsers);// post route for the login and implementing loginUser function 

// Route for user signup
router.post('/signup', signupUsers);// post route for the signup and implementing the signup function

// Route for user logout
router.post('/logout',  logoutUsers);// post route for the logout and implementing the logout function

router.delete('/:user_id', verifyToken, deleleteUserByid);
router.get('/', verifyToken, getAllUser);
// router.get('/:user_id', verifyToken, getUserById);
router.get('/:user_id', verifyToken, getMovieandRatingByUserId)

export default router;// exporting the router instance for usage in app.js
