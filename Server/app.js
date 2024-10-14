const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');// importing the routes file for book
const userRoutes = require('./routes/loginRoutes');
const app = express();

app.use(express.json());
app.use('/movies', movieRoutes);
app.use('/users',userRoutes);
const PORT = 4000;
app.listen(PORT, () => {        // starting the express server on given port
    console.log(`Server is running on port ${PORT}`);
  });