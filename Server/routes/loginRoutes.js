import express from 'express'
const router = express.Router();// creating the instance of route 
import loginController from '../controllers/loginController';// importing the loginController
// Route for user login
router.post('/login', loginController.loginUsers);// post route for the login and implementing loginUser function 

// Route for user signup
router.post('/signup', loginController.signupUsers);// post route for the signup and implementing the signup function

// Route for user logout
router.post('/logout',  loginController.logoutUsers);// post route for the logout and implementing the logout function

module.exports = router;// exporting the router instance for usage in app.js
