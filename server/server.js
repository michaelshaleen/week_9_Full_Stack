const express = require('express'); // without ./ assumes it is a library we installed
const taskRouter = require('./routers/task_router');
const bodyParser = require('body-parser');
//const pool = require('./modules/pool');
const pg = require('pg');

//pool = require('../modules/pool');
const app = express(); // app is an object with many functions within
const PORT = process.env.PORT || 5000;
app.use(express.static('server/public')); //allow ppl to see

// Setup body parser for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//express is using name app for listen function
app.listen(5000, () => {
  console.log(`Server running on port:`, 5000);
});

////////////////////////////////////
let postedTask = [];

// app.post('/tasks', (req, res) => {
//   postedTask = req.body.task_to_add;
//   console.log('postedTask', postedTask);
//   //console.log(routerTask, 'router task');
//   res.sendStatus(201);
// });
// app.get('/tasks', (req, res) => {
//   console.log('in app.get', postedTask.task, postedTask.dueDate);
//   res.send(postedTask);
// });

app.use('/tasks', taskRouter);

//const pg = require('pg');

// const pool = new pg.Pool({
//   database: 'weekend-to-do-app',
//   host: 'localhost',
//   port: 5432,
// });

// pool
//   .query(`SELECT * FROM "tasks"`)
//   .then(function (dbRes) {
//     console.log('dbres', dbRes);
//     res.send(dbRes);
//     //dbres is results of pool.query from db
//     console.log('dbRes.rows', dbRes.rows);
//     res.sendStatus(200);
//   })
//   .catch(function (error) {
//     console.log('error in pool.query server.js');
//     //res.sendStatus(404);
//   });
