import express from 'express'
import dotenv  from "dotenv"
dotenv.config()
import cors from 'cors';
import movieRoutes from './routes/movieRoutes.js'// importing the routes file for book
import userRoutes from './routes/loginRoutes.js'
const app = express();


// Middleware setup
  app.use(express.urlencoded({ extended: true }));// for HTML form submission or value that is submitted in key value pair
  app.use(cors({
    origin: 'http://localhost:5173', // providing the URL of frontend 
    credentials: true // include the cookies and session with other data for autherization
  }));

app.use(express.json());
app.use('/movies', movieRoutes);
app.use('/users',userRoutes);

const PORT = process.env.PORT || 4000; // setting the port for the server, check in .env file if busy then use 4000
  app.listen(PORT, () => {        // starting the express server on given port
    console.log(`Server is running on port ${PORT}`);
  });