const express = require('express');
const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
});

///
///
///
///
///
///
const tasksList = [];
router.get('/', (req, res) => {
  pool
    .query('SELECT * FROM "tasks"') //sql command is run
    .then(function (dbRes) {
      //.then is a callback
      console.log('dbRes.rows', dbRes.rows);
      res.send(dbRes.rows); //results of query sql command
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post();

module.exports = router;
