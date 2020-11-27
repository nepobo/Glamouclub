const regusers = require("../models/usersmod.js");

exports.checkUser = function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
  if(req.query.login!=null){
    regusers.findAll({attributes: ['login'], where: { login: [req.query.login] }, raw:true}).then(reqdata=>{
      if(reqdata.length==0){
        res.send("notexist");
      }
      else {
        res.send("exist");
      }
    }).catch(err=>console.log(err));
  };
};

exports.saveUser = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  regusers.create({
    login: req.body.login,
    email: req.body.email,
    passwrd: req.body.password
  }).then(result=>{
    res.redirect('reguser?status=success');
  }).catch(err=>console.log(err));
};

exports.checkStatus = function(req, res, next) {
  status=req.query.status;
  login=req.query.login;
  if(login!=null) console.log(login);
  if(status==null) res.render('reguser', {})
  else res.render('reguser',{stat: status});
};

