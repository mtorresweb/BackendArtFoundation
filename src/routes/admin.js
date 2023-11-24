const { Router } = require("express");
//controller
const { register, login } = require("../controllers/admin.js");
const router = Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
