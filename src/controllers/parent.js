const { matchedData } = require("express-validator");
const { Parent } = require("../models/Parent.js");
const { Op } = require("sequelize");

const register = async (req, res) => {
  let data = matchedData(req);
  delete data.childID;
  delete data.childName;
  delete data.courses;
  delete data.authorization;
  delete data.birthDate;

  const parentExists = await Parent.findOne({
    where: { [Op.or]: [{ ID: data.ID }, { email: data.email }] },
  });

  if (parentExists) {
    return res.status(400).send({
      status: "error",
      message: "User already exists",
    });
  }

  let parent;
  try {
    parent = await Parent.create(data);
  } catch (error) {
    console.log(error);
  }

  res.status(200).send({
    status: "success",
    parent,
    message: "parent registered successfully",
  });
};

const update = async (req, res) => {
  const data = matchedData(req);

  const parent = await Parent.findByPk(data.ID);
  parent.set(data);
  parent.save();

  res.status(200).send({
    status: "success",
    parent,
    message: "parent updated successfully",
  });
};

const remove = async (req, res) => {
  const { ID } = req.params;

  await Parent.destroy({ where: { ID } });

  res.send({
    status: "success",
    message: "parent removed successfully",
  });
};

const find = async (req, res) => {
  const { ID } = req.params;

  const parent = await Parent.findOne({ ID });

  res.send({
    status: "success",
    parent,
    message: "parent found successfully",
  });
};

const list = async (req, res) => {
  const parentren = await Parent.findAll();

  res.status(200).send({
    status: "success",
    parentren,
    message: "parents found successfully",
  });
};

module.exports = { register, update, remove, find, list };
