const express = require('express');
//const pool = require('../modules/pool');
const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
});

///////////////
router.get('/getTasks', (req, res) => {
  pool // pool.query works don't touch
    .query(`SELECT * FROM "tasks"`)
    .then(function (dbRes) {
      console.log('dbres', dbRes);
      res.send(dbRes.rows);
      console.log('dbRes.rows', dbRes.rows);
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('error in pool.query router.js');
      //res.sendStatus(404);
    });
  s;
});

// router.post('/', (req, res) => {
//   pool.query(`
//   INSERT INTO "tasks"("name", "due_date")
//   VALUES
//     ('$1', '$2'),
//     ('$1', '$2'); //maybe
//   `);
//   console.log('router.post', req.body);
//   res.send('router.post');
// });
// // put new inputs into db

module.exports = router;
