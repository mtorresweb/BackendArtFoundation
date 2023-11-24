const { Router } = require("express");
//controller
const { checkout } = require("../controllers/mercadopago.js");
const router = Router();

router.post("/", checkout);

module.exports = router;
