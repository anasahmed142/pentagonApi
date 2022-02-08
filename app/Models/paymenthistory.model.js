const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var payment = sequelize.define(
  "payment",
  {
    paymentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    remainingAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    previousAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    installmentMounth: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    installmentpayFeatures: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    installmentid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    leadid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventoryid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = payment;
