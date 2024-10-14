const express = require('express');
const app = express();
const PORT = 4000;
app.listen(PORT, () => {        // starting the express server on given port
    console.log(`Server is running on port ${PORT}`);
  });