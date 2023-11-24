const { Admin } = require("../models/Admin.js");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt.js");

const register = async (req, res) => {
  const user = req.body;

  const userExists = await Admin.findOne({
    where: { [Op.or]: [{ email: user.email }, { ID: user.ID }] },
  });

  if (userExists)
    return res
      .status(400)
      .send({ success: false, message: "User already exists" });

  //Encrypts the password, then creates a new user, finally deletes the password property to send the information to the client
  user.password = await bcrypt.hash(user.password, 14);
  await Admin.create(user);
  delete user.password;

  //Sends the token and user data without the password
  return res.status(200).send({
    success: true,
    message: "User registered successfully",
    user: { ...user, token: generateToken(user) },
  });
};
const login = async (req, res) => {
  const userData = req.body;

  //Checks if the user exists
  const user = await Admin.findOne({
    where: { email: userData.email },
  });

  // Checks if the passsword matches the stored one
  let passwordMatch = false;
  if (user) {
    passwordMatch = await bcrypt.compare(userData.password, user.password);
  }

  if (!passwordMatch || !user)
    return res
      .status(400)
      .send({ success: false, message: "Incorrect email or password" });

  let userToReturn = {
    ID: user.ID,
    name: user.name,
    email: user.email,
  };
  userToReturn.token = generateToken(userToReturn);

  return res.status(200).send({
    success: true,
    message: "Logged in successfully",
    user: userToReturn,
  });
};

module.exports = { register, login };
