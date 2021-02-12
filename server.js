const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// express static file serving - public is the folder name
app.use(express.static('server/public'));

// Setup body parser for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use our book router

// Start server listening on PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}...`);
});

// TODO - Move these routes to their own modules!

// group by movie/ book endpoints
// app.get/post are endpoints
// book/movies are nouns
