const { app } = require("./app");
const { sequelize } = require("./database/connection.js");

//Models
require("./models/Child.js");
require("./models/Parent.js");
require("./models/Admin.js");

const run = async () => {
  await sequelize.sync({ force: false });
  console.log("connected to database");
  app.listen(process.env.PORT, () => {
    console.log("app listening on port ", process.env.PORT);
  });
};

run();
