const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var land = sequelize.define(
  "land",
  {
    landid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNoOfRefrence: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "pending",
    },
    marker: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sizeinAcre: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    refrenceName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    extraInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    agreedCostPerAcre: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    totalTokenMoney: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    totalCost: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    profitCost: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    scheduleOfPayment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paidPayments: {
      type: DataTypes.TEXT,
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
module.exports = land;
