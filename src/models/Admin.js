const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");

const Admin = sequelize.define("Admin", {
  ID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Admin };
