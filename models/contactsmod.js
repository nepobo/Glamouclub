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
const contactsattr = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER
  },
  picfilename: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  },
  age: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  information: {
    type: Sequelize.DataTypes.STRING
  }
};
let sequelize = new Sequelize(config); // Создаём подключение
module.exports  = sequelize.define('contact', contactsattr , { timestamps: false });
