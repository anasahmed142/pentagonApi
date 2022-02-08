const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var property = sequelize.define(
  "property",
  {
    propertyid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = property;
