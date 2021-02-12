const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



router.get('/', (req, res) => {
  let queryString = `
  INSERT INTO "tasks"
  ("name", "due_date"),
  VALUES
  ('$1, $2)`;
