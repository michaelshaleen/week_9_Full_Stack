const express = require('express');
const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
});

//////////////////

const tasksList = [];
router.get('/', (req, res) => {
  pool
    .query('SELECT * FROM "tasks"') //sql command is run
    .then(function (dbRes) {
      //.then is a callback
      console.log('dbRes.rows', dbRes.rows);
      console.log('req.body', req.body);

      res.send(dbRes.rows); //results of query sql command
    })
    .catch(function (error) {
      console.log(error);
    });
});
/////////////////////////////////////
router.post('/', function (req, res) {
  console.log('req.body', req.body);
  pool.query(`
  INSERT INTO "tasks"("name", "due_date")
  VALUES 
    ('${req.body.task}', '${req.body.dueDate}'),
    ('Dishes', '01-01-2022');
  `);
  console.log('app.post');
  console.log('req.body', req.body);
  res.send(req.body);
  res.sendStatus(200);
});
module.exports = router;
