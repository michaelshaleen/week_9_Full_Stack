const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const taskRouter = require('./routers/task_router');
const pg = require('pg');
const app = express();
app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, function () {
  console.log('listening on :', 5000);
});

// pool
//   .query('SELECT * FROM "tasks"') //sql command is run
//   .then(function (dbRes) {
//     //.then is a callback
//     console.log('dbRes.rows', dbRes.rows); //results of query sql command
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
app.use('/tasks', taskRouter);

app.use('/DELETE', taskRouter);
