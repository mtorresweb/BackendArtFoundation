const { Router } = require("express");
//controller
const childController = require("../controllers/child.js");
//authentication middleware
//validation middlewares
const {
  validateChildRegister,
} = require("../middlewares/validators/childValidators.js");

const router = Router();

//registers a new parent
router.post("/register", validateChildRegister(), childController.register);
router.put("/update", validateChildRegister(), childController.update);
router.delete("/remove/:ID", childController.remove);
router.get("/find/:ID", childController.find);
router.get("/list", childController.list);

module.exports = router;
