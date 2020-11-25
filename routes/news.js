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
  logging: console.log, // Включаем логи запросов, нужно передать именно функцию, либо false
  operatorsAliases: Sequelize.Op // Передаём алиасы параметров
};
const newsattr = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER
  },
  date: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
};

//Reading from news table and out to page
router.get('/', function(req, res, next) {
  let sequelize = new Sequelize(config);
  let News = sequelize.define('new', newsattr, { timestamps: false });
  News.findAll({raw:true}).then(message=>{
    res.render('news', {msg: message});
  }).catch(err=>console.log(err));
});

//Writing to news base
router.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var moment= require('moment');
  let sequelize = new Sequelize(config);
  let News = sequelize.define('new', newsattr, {timestamps: false});
  News.create({
    name: req.body.username,
    message: req.body.message,
    date: moment()
  }).then(result=>{
    res.redirect('back');
  }).catch(err=>console.log(err));
});

module.exports = router;
