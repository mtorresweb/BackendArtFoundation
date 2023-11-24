const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");

const Child = sequelize.define(
  "Child",
  {
    ID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    courses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    authorization: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    parentID: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { timestamps: false },
);

module.exports = {
  Child,
};
