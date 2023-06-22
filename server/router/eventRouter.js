const express = require("express");
const router = express.Router();
const {
  authentication,
  authorization,
  authorizationAdminOnly,
} = require("../middleware/auth");
const EventController = require("../controllers/eventController");

router.post(
  "/categoryEvent",
  authentication,
  authorization,
  EventController.CreateCategoryEvent
);
router.get("/categoryEvent", EventController.ReadCategory);
router.patch(
  "/categoryEvent/:id",
  authentication,
  authorization,
  EventController.UpdateCategory
);
router.delete(
  "/categoryEvent/:id",
  authentication,
  authorizationAdminOnly,
  EventController.DeleteCategory
);

router.post("/event", authentication, EventController.CreateEvent);
router.get("/event", EventController.ReadEvents);
router.patch("/event/:id", authentication, EventController.UpdateEvent);
router.delete(
  "/event/:id",
  authentication,
  authorization,
  EventController.DeleteEvent
);

module.exports = router;
