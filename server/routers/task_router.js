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
    .query(`SELECT * FROM "tasks"`)
    .then(function (dbRes) {
      res.send(dbRes);
      //dbres is results of pool.query from db
      console.log('dbRes.rows', dbRes.rows);
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('error');
      res.sendStatus(404);
    });
});

router.post('/', (req, res) => {
  pool.query(`
  INSERT INTO "tasks"("name", "due_date")
  VALUES 
    ('$1', '$2'),
    ('$1', '$2');
  `);
  console.log('router.post');
  res.send('router.post');
});
// put new inputs into db

module.exports = router;
