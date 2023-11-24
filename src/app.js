const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler.js");
require("express-async-errors");
const { NotFoundError } = require("./utils/errors.js");

const childRoutes = require("./routes/child.js");
const parentRoutes = require("./routes/parent.js");
const mercadopagoRoutes = require("./routes/mercadopago.js");
const adminRoutes = require("./routes/admin.js");

const app = express();

// Security configuration
app.use(cors());

//Valid content types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/child", childRoutes);
app.use("/api/v1/mercadopago", mercadopagoRoutes);
app.use("/api/v1/admin", adminRoutes);

//Not found middleware
app.use("*", (req, res, next) => next(new NotFoundError(req.path)));

//Error middleware
app.use(errorHandler);

module.exports = {
  app,
};
