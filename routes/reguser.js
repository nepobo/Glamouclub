var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const Sequelize = require("sequelize");
const config =  {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  dialectOptions: {
    multipleStatements: true
  },
  logging: console.log, // Включаем логи запросов
  operatorsAliases: Sequelize.Op // Передаём алиасы параметров
};
const reguserattr = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER
  },
  login: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  },
  passwrd: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
}

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
    if(req.query.login!=null){
      let sequelize = new Sequelize(config);
      let regusers = sequelize.define('reguser', reguserattr , { timestamps: false });
      regusers.findAll({attributes: ['login'], where: { login: [req.query.login] }, raw:true}).then(reqdata=>{
        if(reqdata.length==0){
          res.send("notexist");
        }
        else {
          res.send("exist");
        }
      }).catch(err=>console.log(err));
    };
});

// Writing to reguser base.
router.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  let sequelize = new Sequelize(config);
  let regusers = sequelize.define('reguser', reguserattr , { timestamps: false });
  regusers.create({
    login: req.body.login,
    email: req.body.email,
    passwrd: req.body.password
  }).then(result=>{
    res.redirect('reguser?status=success');
  }).catch(err=>console.log(err));

});
module.exports = router;
