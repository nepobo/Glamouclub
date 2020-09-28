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
  if(req.query.table!=null) sql1 = `SELECT * FROM ${req.query.table}`
  else sql1=``;
  db
    .query(sql1)
    .then(data=>{res.render('admin', {tables: data1, datainf: data});})
    .catch(err=>{
      console.log(err);
      data=null;
      res.render('admin', {tables: data1, datainf: data});
      db.end();
    })


});

//Запись в базу новостей
router.post('/', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    res.redirect("admin?table="+req.body.tablename);
});
router.post('/del', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const {Client} = require('pg');
    const db = new Client();
    db.connect();
    if(req.body.tablename!=null) sql1=`delete FROM ${req.body.tablename}`
    else sql1=``;
    console.log(sql1);
    db
        .query(sql1)
        .then(data=>{
            res.redirect('back');

        })
        .catch(err=>console.log(err))
});
module.exports = router;
