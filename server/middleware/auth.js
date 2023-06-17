const { verifyToken } = require("../helpers/helper");
const { Customer, Admin, Staff, Event } = require("../models");

async function authenticationAdmin(req, _, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) throw { name: "InvalidToken" };

    let payload = verifyToken(access_token);

    let admin = await Admin.findOne({ where: { email: payload.email } });

    if (!admin) throw { name: "InvalidToken" };

    req.admin = {
      id: admin.id,
      email: admin.email,
    };

    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: authentication.js ~ authenticationAdmin ~ error:",
      error
    );
    next(error);
  }
}

async function authorization(req, _, next) {
  try {
    let admin = req.admin;
    if (!admin) throw { name: "Forbidden" };

    next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ authorization ~ error:", error);
    next(error);
  }
}

module.exports = { authenticationAdmin, authorization };
