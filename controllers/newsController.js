const News = require("../models/newsmod.js");

//Reading from news table and out to page
exports.readNews = function(req, res) {
  News.findAll({raw:true}).then(message=>{
    res.render('news', {msg: message});
  }).catch(err=>console.log(err));
};

//Writing to news base
exports.addNews = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var moment= require('moment');
  News.create({
    name: req.body.username,
    message: req.body.message,
    date: moment()
  }).then(result=>{
    res.redirect('back');
  }).catch(err=>console.log(err));
};


