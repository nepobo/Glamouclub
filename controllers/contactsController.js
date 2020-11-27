const Contact = require("../models/contactsmod.js");

exports.readContacts = function(req, res, next)
{
  Contact.findAll({raw:true}).then(contacts=>{
    res.render('contacts', {user: contacts});
  }).catch(err=>console.log(err));
};