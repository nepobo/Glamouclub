var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res, next) {
    res.render('reguser', {});
});

// Writing to reguser base.
router.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const {Client} = require('pg');
  const db = new Client();
  var moment= require('moment');
  db.connect();
    db
      .query(`SELECT login FROM reguser WHERE login='${req.body.login}'`)
      .then(data=>{
          if(data.rows.length==0) {
              db
                .query(`INSERT INTO reguser (login , email, passwrd ) VALUES ('${req.body.login}', '${req.body.email}', '${req.body.password}')`)
                .then(data1 => {
                    res.redirect('back');
                    db.end();
                })
                .catch(err => console.log(err))
          }
          else {res.send("Пользователь уже зарегестрирован");}
      })
        .catch(err=>console.log(err))

});

module.exports = router;
