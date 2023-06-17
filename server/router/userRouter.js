const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/adminRegister", UserController.AdminRegister);
router.post("/adminLogin", UserController.AdminLogin);
module.exports = router;
