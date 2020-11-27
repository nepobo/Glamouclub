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
  logging: console.log, // Включаем логи запросов
  operatorsAliases: Sequelize.Op // Передаём алиасы параметров
};
const reguserattr = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER
  },
  login: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  },
  passwrd: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
};

let sequelize = new Sequelize(config);
module.exports = sequelize.define('reguser', reguserattr , { timestamps: false });