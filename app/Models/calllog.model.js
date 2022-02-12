const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var calllog = sequelize.define(
  "calllog",
  {
    calllogid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    callVoiceUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    leadid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);
module.exports = calllog;
