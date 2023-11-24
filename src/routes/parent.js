const { Router } = require("express");
//controller
const parentController = require("../controllers/parent.js");
//validation middlewares
const {
  validateParentRegister,
} = require("../middlewares/validators/parentValidators.js");

const router = Router();

//registers a new parent
router.post("/register", validateParentRegister(), parentController.register);
router.put("/update", validateParentRegister(), parentController.update);
router.delete("/remove/:ID", parentController.remove);
router.get("/find/:ID", parentController.find);
router.get("/list", parentController.list);

module.exports = router;
