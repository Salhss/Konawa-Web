const { verifyToken } = require("../helpers/helper");
const { Customer, Admin, Staff, Event } = require("../models");

async function authentication(req, _, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) throw { name: "InvalidToken" };

    let payload = verifyToken(access_token);

    let admin = await Admin.findByPk(payload.id);
    let staff = await Staff.findByPk(payload.id);
    let customer = await Customer.findByPk(payload.id);

    if (!admin) throw { name: "InvalidToken" };
    if (!staff) throw { name: "InvalidToken" };
    if (!customer) throw { name: "InvalidToken" };

    req.admin = {
      id: admin.id,
      email: admin.email,
    };
    req.staff = {
      id: staff.id,
      email: staff.email,
    };
    req.customer = {
      id: customer.id,
      email: customer.email,
    };

    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: authentication.js:22 ~ authenticationAdmin ~ error:",
      error
    );
    next(error);
  }
}

async function authorization(req, _, next) {
  try {
    let adminEmail = req.admin.email;
    if (!adminEmail) throw { name: "Forbidden" };

    let event = await Event.findByPk(req.params.id);
    if (event) throw { name: "NotFound" };

    next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js:52 ~ authorization ~ error:", error);
    next(error);
  }
}

module.exports = { authentication, authorization };
