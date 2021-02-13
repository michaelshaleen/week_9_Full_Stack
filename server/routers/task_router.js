const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const pg = require('pg');

// const pool = new pg.Pool({
//   database: 'weekend-to-do-app',
//   host: 'localhost',
//   port: 5432,
// });

router.get('/', (req, res) => {
  pool
    .query('SELECT * FROM "tasks"')
    .then(function (dbRes) {
      //dbres is results of pool.query from db
      console.log('dbRes.rows', dbRes.rows);
    })
    .catch(function (error) {
      console.log('error');
    });
  res.send(newTask);
});

module.exports = router;
