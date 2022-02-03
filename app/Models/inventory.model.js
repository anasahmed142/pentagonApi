const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var inventory = sequelize.define(
  "inventory",
  {
    inventoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    features: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    payment: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    roadSize: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    size: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ttype: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = inventory;
