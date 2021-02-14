const express = require('express');
const router = express.Router();
//const pg = require('pg');
const pool = require('../modules/pool');

//////////////////
//we want to select most recent and append
const tasksList = [];
router.get('/', (req, res) => {
  pool
    .query('SELECT * FROM "tasks"') //sql command is run
    .then(function (dbRes) {
      //.then is a callback
      console.log('dbRes.rows', dbRes.rows);
      console.log('req.body', req.body);

      res.send(dbRes.rows);
      //results of query sql command
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
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
  // where are placeholders getting plugged in
  let queryArgs = [
    req.body.task_to_add.task, // $1
    req.body.task_to_add.due_date, // $2
  ];

  console.log('query sting', queryString);
  console.log('query args', queryArgs);

  //console.log('app.post');
  pool
    .query(queryString, queryArgs)
    .then(function (dbRes) {
      res.send(201);
    })
    .catch(function (error) {
      console.log(error);

      res.sendStatus(500);
    });
});

////////////////////////////////
////////////////////////////////

router.delete('/tasks/:id', (req, res) => {
  console.log('router.delete', req.params.id); // object object,,,WHERE "id"=$1;
  let reqId = req.params.id;
  console.log('delete request id', reqId.id);
  let sqlText = `DELETE FROM "tasks" `;

  pool
    .query(sqlText, [reqId])
    .then((result) => {
      //.then is a callback
      console.log('task deleted');
      res.send(200);
      //results of query sql command
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

router.put('/:id', (req, res) => {
  console.log('req', req.body.id.task);
  let completedID = req.params.id;
  console.log('completedID', completedID.task, completedID.due_date);
  let sqlUpdate = `
  UPDATE "tasks"
  SET "complete" = TRUE
  WHERE "id" = $1;
  `;
  pool
    .query(completedID, sqlUpdate)
    .then((result) => {
      console.log('task updated');
      res.send(200);
    })
    .catch(function (error) {
      console.log('err router complete');
      res.sendStatus(500);
    });
});
module.exports = router;
