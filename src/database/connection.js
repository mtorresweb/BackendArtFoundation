const Sequelize = require("sequelize");

//const sequelize = new Sequelize(process.env.POSTGRES_URL);

const sequelize = new Sequelize(
  "art_foundation",
  "art_foundation",
  "art_foundation",
  {
    host: "localhost",
    dialect: "postgres",
  },
);

module.exports = { sequelize };
