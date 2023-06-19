const express = require("express");
const router = express.Router();
const { authentication, authorization } = require("../middleware/auth");
const EventController = require("../controllers/eventController");

router.post(
  "/categoryEvent",
  authentication,
  authorization,
  EventController.CreateCategoryEvent
);

module.exports = router;
