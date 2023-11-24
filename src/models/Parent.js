const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");
const { Child } = require("./Child");

const Parent = sequelize.define("Parent", {
  ID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maritalStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spouseID: {
    type: DataTypes.BIGINT,
  },
  spouseName: {
    type: DataTypes.STRING,
  },
  hasAJob: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.STRING,
  },
  noJobDescription: {
    type: DataTypes.STRING,
  },
});

Parent.hasMany(Child, {
  foreignKey: "parentID",
  sourceKey: "ID",
});

Child.belongsTo(Parent, {
  foreignKey: "parentID",
  targetId: "ID",
});

module.exports = { Parent };
