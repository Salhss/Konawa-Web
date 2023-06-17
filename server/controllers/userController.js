const { Admin, Staff } = require("../models");
const { comparePassword, signToken } = require("../helpers/helper");

module.exports = class UserController {
  static async AdminRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email Empty" };
      if (!password) throw { name: "Password Empty" };

      let admin = await Admin.findOne({ where: { email } });
      if (admin) throw { name: "Email Not Unique" };

      let newAdmin = await Admin.create({ email, password });
      res.status(201).json({ message: `${newAdmin.email} have been created` });
    } catch (error) {
      console.log("🚀 ~ file: userController.js:6 :", error);
      next(error);
    }
  }
  static async AdminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email Empty" };
      if (!password) throw { name: "Password Empty" };

      let admin = await Admin.findOne({ where: { email } });
      if (!admin) throw { name: "Email Not Match" };

      let isValidPassword = comparePassword(password, admin.password);
      if (!isValidPassword) throw { name: "Password Not Match" };

      let payload = {
        id: admin.id,
        email: admin.email,
      };

      let access_token = signToken(payload);

      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js:24 ~ UserController ~ AdiminLogin:",
        error
      );
      next(error);
    }
  }
  static async CreateStaff(req, res, next) {
    try {
      const { email, password, username } = req.body;
      if (!email) throw { name: "Email Empty" };
      if (!password) throw { name: "Password Empty" };
      if (!username) throw { name: "Username Empty" };

      const staff = await Staff.findOne({
        where: { email: email },
      });
      if (staff) throw { name: "Email Not Unique" };

      const newStaff = await Staff.create({
        email,
        password,
        username,
        adminId: req.admin.id,
        status: "active",
      });

      res.status(201).json({
        message: `staff with email ${newStaff.email} create successfully`,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js ~ UserController ~ CreateStaff:",
        error
      );
      next(error);
    }
  }
  static async LoginStaff(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email Empty" };
      if (!password) throw { name: "Password Empty" };

      const staff = await Staff.findOne({
        where: { email: email, status: "active" },
      });
      if (!staff) throw { name: "Invalid Account" };

      const isValidPassword = comparePassword(password, staff.password);
      if (!isValidPassword) throw { name: "Password Not Match" };

      let access_token = signToken({
        id: staff.id,
        email: staff.email,
      });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(
        "🚀 ~ file: userController.js ~ UserController ~ LoginStaff:",
        error
      );
      next(error);
    }
  }
};
