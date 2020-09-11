var express = require('express');
var router = express.Router();

/* GET table data */
router.get('/', function(req, res, next) {
  const {Client} = require('pg');
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'glamobase',
    password: 'admin',
    port: 5432
  });

  db.connect();
  db.query("SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema','pg_catalog')", (err, data) => {
    if (err)
      throw new Error(err);
    console.log(err);
    res.render('admin', {user: data.rows});
    db.end();
  });
});

module.exports = router;
