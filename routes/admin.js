var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
/* GET table data */
router.get('/', function(req, res, next) {
  const {Client} = require('pg');
  const db = new Client();
  var data1;

  db.connect();
  sql1= "SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema','pg_catalog')";
  db
    .query(sql1)
    .then(data=>{
        data1=data.rows;

    })
    .catch(err=>console.log(err))
  sql1 = `SELECT * FROM ${req.query.table}`;
  db
    .query(sql1)
    .then(data=>{res.render('admin', {tables: data1, datainf: data});})
    .catch(err=>{
      console.log(err.stack);
      data=null;
      res.render('admin', {tables: data1, datainf: data});
      db.end();
    })


});

//Запись в базу новостей
router.post('/', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    //${req.body.username}

    //res.redirect('back');
    res.redirect("admin?table="+req.body.tablename);
});
module.exports = router;
