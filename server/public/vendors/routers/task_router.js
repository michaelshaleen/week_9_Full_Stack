const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

module.exports = router;


router.get('/', (req, res) => {
  let queryString = `
  INSERT INTO "songs"
  ("tasks" "Due Date)
  VALUES
  ('$1, $2)`};


  let queryArg = [
    req.body.name, //$1
    req.body.dueDate, //$2
  ];


  pool
    .query(queryString, queryArg)
    .then(function (dbRes) {
      console.log("dbres", dbRes)
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('error');
      res.sendStatus(500);
    });
);
router.post('/', (req, res) => {
  console.log('req.body', req.body);

  //pool.query insert into songs
  //.then res.sendsetatus201
  res.sendStatus(200);
});

router.get('/:id', (req, res) =>{
  console.log(req.params, "req.params")
  let taskID = req.params.id;
  console.log(taskID, "task id")

  pool.qeury(`
  SELECT * FROM "tasks"
  WHERE "id" = $1`
  [taskID])
  .then((dbRes) => {
    res.send(dbRes.rows[0])
    console.log(dbRes.row[0])

  })
  .catch(error => {
    console.log("get by ID failed", error);
    res.sendStatus(500)
  }


})