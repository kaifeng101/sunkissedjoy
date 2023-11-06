const express = require("express");
const authController = require("../controller/oAuth");

const router = express.Router();

router.post("/google/register", authController.GoogleRegister);
router.post("/google/login", authController.GoogleLogin);


module.exports = router;