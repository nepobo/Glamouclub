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

let sequelize = new Sequelize(config);
module.exports = sequelize.define('new', newsattr, {timestamps: false});