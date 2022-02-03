const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var User = sequelize.define(
  "users",
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    designation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      defaultValue: "some address",
    },
    cnic: {
      type: DataTypes.DOUBLE,
      defaultValue: 4211111111111,
    },
    prohibition: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
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
module.exports = User;
