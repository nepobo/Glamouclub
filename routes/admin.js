var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const adminController = require('../controllers/adminController');

// GET tables name
router.get('/', adminController.getTablesName);

// вывод выбранной базы
router.post('/', urlencodedParser, adminController.outTableData);

//удаление содержимого выбранной базы
router.post('/del', urlencodedParser, adminController.deleteAll);

// Delete row from current table
router.post('/delRow', urlencodedParser, adminController.delRow);

// Add row to current table
router.post('/addRow', urlencodedParser, adminController.addRow);

module.exports = router;
