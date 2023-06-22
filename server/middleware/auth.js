const { verifyToken } = require("../helpers/helper");
const { Customer, Admin, Staff, Events } = require("../models");

async function authentication(req, _, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) throw { name: "InvalidToken" };

    let payload = verifyToken(access_token);

    let admin = await Admin.findOne({ where: { email: payload.email } });

    if (admin) {
      req.admin = {
        id: admin.id,
        email: admin.email,
      };
    } else if (!admin) {
      let staff = await Staff.findOne({ where: { email: payload.email } });

      if (!staff || staff.status == "inactive") throw { name: "InvalidToken" };

      req.staff = {
        id: staff.id,
        email: staff.email,
      };
    } else {
      throw { name: "InvalidToken" };
    }

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
    if (req.staff) {
      let event = await Events.findOne({ where: { creator: req.staff.email } });
      if (!event) throw { name: "Forbidden" };
      next();
    } else if (req.admin) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ authorization ~ error:", error);
    next(error);
  }
}

async function authorizationAdminOnly(req, _, next) {
  try {
    if (!req.admin) throw { name: "Forbidden" };
    next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ authorizationAdminOnly:", error);
    next(error);
  }
}

module.exports = { authentication, authorization, authorizationAdminOnly };
