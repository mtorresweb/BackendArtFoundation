const { body } = require("express-validator");
const { validateResults } = require("../validationHandler");

const validateParentRegister = () => [
  body("ID")
    .exists()
    .withMessage("ID is required")
    .isInt()
    .isLength({ min: 8, max: 10 })
    .withMessage("ID must be between 8 and 10 digits"),
  body("name")
    .exists()
    .withMessage("The parent  name is required")
    .isString()
    .isLength({ min: 3, max: 25 })
    .withMessage("name must be between 3 and 25 characters")
    .trim()
    .escape()
    .toLowerCase(),
  body("email", "A valid email address is required")
    .exists()
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body("address").exists().isString().trim().toLowerCase(),
  body("maritalStatus").exists().isString(),
  body("spouseID").optional().isInt(),
  body("spouseName").optional().isString().trim().escape().toLowerCase(),
  body("hasAJob").exists().isBoolean(),
  body("jobType").optional().trim().escape(),
  body("noJobDescription").optional().trim().escape(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validateParentRegister,
};
