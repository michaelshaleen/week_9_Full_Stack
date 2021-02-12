const pool = require('../modules/pool');



router.get('/', (req, res) => {
  let queryString = `
  INSERT INTO "songs"
  ("tasks" "Due Date)
  VALUES
  ('$1, $2)`};