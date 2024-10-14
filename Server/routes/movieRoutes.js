const router = require('express').Router();// creating the instance of route from express
const movieControllers = require('../controllers/movieController'); // importing the moviecontroller module file here 



// Route to get all books with optional pagination
router.get('/', movieControllers.getAllBooks); //for route get first it will exceute the verifyToken function and after then getAllBooks function

// Route to add a new book
router.post('/add', movieControllers.postAllBooks); //for route post at /add first it will go inside the verifyToken function then at verifyAdmin function and at last postAllBook function 


module.exports = router;