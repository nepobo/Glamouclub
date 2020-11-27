exports.getTablesName = function(req, res, next) {
  const {Client} = require('pg');
  const db = new Client();
  var data1;
  db.connect();
  sql1= "SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema','pg_catalog')";
  db
      .query(sql1)
      .then(data=>{
        data1=data.rows;

      })
      .catch(err=>console.log(err));

  if (req.query.table == null) {
    sql1 = ``;
  } else {
    sql1 = `SELECT * FROM ${req.query.table}`
  }
  db
      .query(sql1)
      .then(data=>{res.render('admin', {tables: data1, datainf: data, curtable:req.query.table});})
      .catch(err=>{
        console.log(err);
        data=null;
        res.render('admin', {tables: data1, datainf: data});
        db.end();
      })
};

exports.outTableData = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  res.redirect("admin?table="+req.body.tablename);
};

exports.deleteAll = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const {Client} = require('pg');
  const db = new Client();
  db.connect();
  if (req.body.tablename == null) {
    sql1 = ``;
  } else {
    sql1 = `delete FROM ${req.body.tablename}`
  }
  console.log(sql1);
  db
      .query(sql1)
      .then(data=>{
        res.redirect('back');

      })
      .catch(err=>console.log(err))
};

exports.delRow = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const {Client} = require('pg');
  const db = new Client();
  db.connect();
  if(req.body.tablename!=null) sql1=`delete FROM ${req.body.tablename} where id=${req.body.idRow}`
  else sql1=``;
  db
      .query(sql1)
      .then(data=>{
        res.redirect('back');

      })
      .catch(err=>console.log(err))
};

exports.addRow = function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const {Client} = require('pg');
  const db = new Client();
  db.connect();
  //console.log(req.body);
  if(req.body.curtable != null){
    fields = "";
    values = "";
    for (var prop in req.body){
      if(prop !="curtable"){
        fields += prop+", ";
        values += `'`+req.body[prop]+`', `;
      }
    }
    fields = "("+fields.slice(0,-2)+")";
    values = "("+values.slice(0,-2)+")";
    sql1=`INSERT INTO ${req.body.curtable} ${fields} VALUES ${values}`;
    //console.log(sql1);
  }
  else sql1=``;
  db
      .query(sql1)
      .then(data=>{
        res.redirect('back');

      })
      .catch(err=>console.log(err))
}