var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res, next) {
    status=req.query.status;
    login=req.query.login;
    if(login!=null) console.log(login);
    if(status==null) res.render('reguser', {})
    else res.render('reguser',{stat: status});
});

//Проверка существования пользователя в БД
router.get('/logincheck', function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    login=req.query.login;
    if(login!=null){
      const {Client} = require('pg');
      const db = new Client();
      var moment= require('moment');
      db.connect();
      db
      .query(`SELECT login FROM reguser WHERE login='${req.query.login}'`)
      .then(data=>{
        if(data.rows.length==0){
          res.send("notexist");
          db.end();
        }
        else {
          res.send("exist");
          db.end();
        }
      })
      .catch(err=>console.log(err))
    };
});

// Writing to reguser base.
router.post('/', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const {Client} = require('pg');
    const db = new Client();
    var moment= require('moment');
    db.connect();
    db
      .query(`INSERT INTO reguser (login , email, passwrd ) VALUES ('${req.body.login}', '${req.body.email}', '${req.body.password}')`)
      .then(data1 => {
        res.redirect('reguser?status=success');
        db.end();
      })
      .catch(err => console.log(err))
});
module.exports = router;
