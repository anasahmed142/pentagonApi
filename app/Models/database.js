const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(
    dbConfig.dbName,
    dbConfig.dbUsername,
    dbConfig.dbPassword,
    {
      host: dbConfig.dbHost,
      dialect: "mysql",
    }
  );
  module.exports = sequelize;