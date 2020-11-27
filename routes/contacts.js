var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.readContacts);

module.exports = router;
