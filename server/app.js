if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./router/userRouter");
const eventRouter = require("./router/eventRouter");
const express = require("express");
const app = express();
const cors = require("cors");
const UserController = require("./controllers/userController");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(eventRouter);
app.use(errorHandler);

app.post("/adminRegister", UserController.AdminRegister);

module.exports = app;
