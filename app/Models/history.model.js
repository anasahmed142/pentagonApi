const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var history = sequelize.define(
  "history",
  {
    historyid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    FollowUpDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    IntrestedIn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ProjectIntrestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    leadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
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
module.exports = history;
