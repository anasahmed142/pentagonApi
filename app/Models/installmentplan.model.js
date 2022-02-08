const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var installment = sequelize.define(
  "installment",
  {
    installmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    installmentpayFeatures: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    installmentPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
module.exports = installment;
