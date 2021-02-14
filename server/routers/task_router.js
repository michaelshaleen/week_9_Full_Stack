const express = require('express');
const router = express.Router();
//const pg = require('pg');
const pool = require('../modules/pool');

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
        INSERT INTO "tasks"
            ("name", "due_date")
        VALUES
            ($1, $2);
    `;

  let queryArgs = [
    req.body.task_to_add.task, // $1
    req.body.task_to_add.due_date, // $2
  ];

  //console.log('query sting', queryString);
  console.log('query args', queryArgs);

  //console.log('app.post');
  pool
    .query(queryString, queryArgs)
    .then(function (dbRes) {
      res.send(req.body);
    })
    .catch(function (error) {
      console.log(error);

      res.sendStatus(500);
    });
});
module.exports = router;
