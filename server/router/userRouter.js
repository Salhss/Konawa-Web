const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/adminRegister", UserController.AdminRegister);

module.exports = router;
