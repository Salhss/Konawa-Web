const express = require("express");
const router = express.Router();
const { authentication, authorization } = require("../middleware/auth");
const UserController = require("../controllers/userController");

router.post("/adminRegister", UserController.AdminRegister);
router.post("/adminLogin", UserController.AdminLogin);

router.post(
  "/staffRegister",
  authentication,
  authorization,
  UserController.CreateStaff
);
router.post("/staffLogin", UserController.LoginStaff);

module.exports = router;
