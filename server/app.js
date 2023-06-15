if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./router/userRouter");
const eventRouter = require("./router/eventRouter");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(eventRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
