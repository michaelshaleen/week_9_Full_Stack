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
  let queryString = `
        INSERT INTO "songs"
            ("name", "due_date")
        VALUES
            -- Use placeholder to prevent SQL Injection!
            ($1, $2);
    `;

  let queryArgs = [
    req.body.task, // $1
    req.body.dueDate, // $2
  ];

  console.log('query sting', queryString);
  console.log('query args', queryArgs);

  pool.query(queryString, queryArgs);
  console.log('app.post');
  console
    .log('req.body', req.body)
    .then(function (dbRes) {
      res.send(req.body);
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log(error);
    });
});
module.exports = router;
