const { Admin } = require("../models");
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
};
