const pool = require('../modules/pool');



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
    .query(queryString, queryArg)// plugged into function