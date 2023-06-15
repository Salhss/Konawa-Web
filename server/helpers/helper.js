const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
};
