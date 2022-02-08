const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var attendance = sequelize.define(
  "attendance",
  {
    attendanceid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkInTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    checkOutTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    todayDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    leaves: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = attendance;
