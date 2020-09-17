var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next)
{
  const {Client} = require('pg');
  const db = new Client();

   db.connect();
   db.query('SELECT * FROM contacts', (err, data) => {
        if (err)
            throw new Error(err);
       console.log(err);
        res.render('contacts', {user: data.rows});
       db.end();
    });

});

module.exports = router;
