var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Чтение из базы новостей и вывод на страницу
router.get('/', function(req, res, next) {
  const {Client} = require('pg');
  const db = new Client();
  db.connect();
  db.query('SELECT * FROM news', (err, data) => {
    if (err)
      throw new Error(err);
    console.log(err);
    res.render('news', {msg: data.rows});
    db.end();
  });
});

//Writing to news base
router.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const {Client} = require('pg');
  const db = new Client();
  var moment= require('moment');
  db.connect();
  db
    .query(`INSERT INTO news (date, name, message ) VALUES ('${moment().format('DD.MM.YYYY')}', '${req.body.username}', '${req.body.message}')`)
    .then(data=>{
      res.redirect('back');
      db.end();
      })
    .catch(err=>console.log(err))
});

module.exports = router;
