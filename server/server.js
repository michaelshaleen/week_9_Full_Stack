const express = require('express'); // without ./ assumes it is a library we installed
//console.log('express', express);
const routerTask = require('./routers/task_router.js');
const bodyParser = require('body-parser');

const app = express(); // app is an object with many functions within
const PORT = process.env.PORT || 5000;

// express static file serving - public is the folder name
app.use(express.static('server/public')); //allow ppl to see

// Setup body parser for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use our book router

//express is using name app for listen function
app.listen(5000, () => {
  console.log(`Server running on port:`, 5000);
});

// TODO - Move these routes to their own modules!

// group by movie/ book endpoints
// app.get/post are endpoints
// book/movies are nouns
let postedTask = [];

app.post('/tasks', (req, res) => {
  postedTask = req.body.task_to_add;
  console.log('postedTask', postedTask);
  console.log(routerTask, 'router task');
  res.sendStatus(201);
});

app.get('/tasks', (req, res) => {
  console.log(postedTask.task);
  res.send(postedTask);
});

app.use(routerTask);
