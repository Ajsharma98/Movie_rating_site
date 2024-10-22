import express from 'express';
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import cors from 'cors';
import sequelize from './database/db.js'; // Import the Sequelize instance
import movieRoutes from './routes/movieRoutes.js'; // Import movie routes
import userRoutes from './routes/loginRoutes.js'; // Import user routes
import ratingRoutes from './/routes/ratingRoutes.js';
import ratingforMovie from './routes/ratingforMovie.js';
import './Model/index.js'; // Import the associations to set up relationships between models

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true })); // For HTML form submission or key-value pair data
app.use(cors({
    origin: 'http://localhost:5173', // URL of the frontend
    credentials: true // Include cookies and session for authorization
}));

app.use(express.json()); // To parse incoming JSON requests

// Routes
app.use('/movies', movieRoutes); // Route for movies
app.use('/users', userRoutes); 
app.use ('/rating',ratingRoutes);// Route for users
app.use('/movierating',ratingforMovie);

// Sync the database and start the server
const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => { // Start the server
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });
