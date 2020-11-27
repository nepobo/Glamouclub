var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const reguserController = require('../controllers/reguserController');

//проверка статуса сохранения
router.get('/', reguserController.checkStatus);

//Проверка существования пользователя в БД
router.get('/logincheck', reguserController.checkUser);

// saving to reguser base.
router.post('/', urlencodedParser, reguserController.saveUser);

module.exports = router;
