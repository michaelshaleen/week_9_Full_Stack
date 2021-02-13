const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const pool = new pg.Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
});

pool
  .query('SELECT * FROM "tasks"') //sql command is run
  .then(function (dbRes) {
    //.then is a callback
    console.log('dbRes.rows', dbRes.rows); //results of query sql command
  })
  .catch(function (error) {
    console.log(error);
  });
