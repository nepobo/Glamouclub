var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Чтение из базы новостей и вывод на страницу
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
  db.query('SELECT * FROM news', (err, data) => {
    if (err)
      throw new Error(err);
    console.log(err);
    res.render('news', {msg: data.rows});
    db.end();
  });
});
//Запись в базу новостей
router.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const {Client} = require('pg');
  const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'glamobase',
    password: 'admin',
    port: 5432
  });
  var moment= require('moment');
  db.connect();
  db.query("INSERT INTO news (date, name, message ) VALUES ('"+moment(Date()).format('DD.MM.YYYY')+"', '"+req.body.username+"', '"+req.body.message+"')", (err, data) => {
    if (err)
      throw new Error(err);
    console.log(err);
    db.end();
  });
  res.redirect('back');
  //res.send(req.body.username+' '+ req.body.message);
});


module.exports = router;
