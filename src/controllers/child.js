const { Child } = require("../models/Child.js");
const { Parent } = require("../models/Parent.js");
const { matchedData } = require("express-validator");

const register = async (req, res) => {
  let data = matchedData(req);

  const childExists = await Child.findOne({
    where: { ID: data.ID },
  });

  if (childExists) {
    return res.status(400).send({
      status: "error",
      message: "Child already exists",
    });
  }

  const child = await Child.create(data);

  res.status(200).send({
    status: "success",
    child,
    message: "child registered successfully",
  });
};

const update = async (req, res) => {
  const data = matchedData(req);

  const child = await Child.findByPk(data.ID, {
    include: [{ model: Parent }],
  });
  child.set(data);
  child.save();

  res
    .status(200)
    .send({ status: "success", child, message: "child updated successfully" });
};

const remove = async (req, res) => {
  const { ID } = req.params;

  const child = await Child.findOne({
    where: { ID },
  });

  if (!child)
    return res.status(400).send({
      status: "error",
      message: "Child does not exist",
    });

  await Parent.destroy({ where: { ID: child.parentID } });
  await Child.destroy({ where: { ID } });

  res.send({
    status: "success",
    message: "child removed successfully",
  });
};

const find = async (req, res) => {
  const { ID } = req.params;

  const child = await Child.findOne({
    where: { ID },
    include: [{ model: Parent }],
  });

  res.send({
    status: "success",
    child,
    message: "child found successfully",
  });
};

const list = async (req, res) => {
  const children = await Child.findAll({
    attributes: ["ID", "name", "birthDate", "courses"],
  });

  res.status(200).send({
    status: "success",
    children,
    message: "children found successfully",
  });
};

module.exports = { register, update, remove, find, list };
