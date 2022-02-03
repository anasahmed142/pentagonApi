const { DataTypes } = require("sequelize");
const sequelize = require("./database");

var project = sequelize.define(
  "projects",
  {
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Type: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    field: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    file2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    file3: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    marker: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file4: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    installMonths: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    otherFiles: {
        type: DataTypes.TEXT,
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
module.exports = project;
