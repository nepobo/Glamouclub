var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const newsController = require('../controllers/newsController');
//Reading from news table and out to page
router.get('/', newsController.readNews);
//Writing to news base and out to page
router.post('/', urlencodedParser, newsController.addNews);

module.exports = router;
