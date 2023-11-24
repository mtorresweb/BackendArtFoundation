const { body } = require("express-validator");
const { validateResults } = require("../validationHandler");

const validateChildRegister = () => [
  body("ID")
    .exists()
    .withMessage("ID is required")
    .isInt()
    .isLength({ min: 8, max: 10 })
    .withMessage("ID must be between 8 and 10 digits"),
  body("name")
    .exists()
    .withMessage("The parent  name is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("name must be between 3 and 25 characters")
    .trim()
    .escape()
    .toLowerCase(),
  body("birthDate").exists().toDate().withMessage("enter a valid date"),
  body("courses").exists().isArray().withMessage("enter a list of courses"),
  body("authorization").exists().isBoolean().withMessage("enter authorization"),
  body("parentID")
    .exists()
    .withMessage("parentID is required")
    .isInt()
    .isLength({ min: 8, max: 10 })
    .withMessage("parentID must be between 8 and 10 digits"),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validateChildRegister,
};
