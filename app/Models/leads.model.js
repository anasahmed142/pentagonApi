const { DataTypes } = require("sequelize");
const { land } = require(".");
const sequelize = require("./database");

var leads = sequelize.define(
  "leads",
  {
    leadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "unassigned",
    },
    Intrested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    IntrestedIn: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    FollowUpDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    time: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inventoryid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    landid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    propertyid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assignAgent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = leads;
