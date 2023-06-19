const { CategoryEvents, Events } = require("../models");

module.exports = class EventController {
  static async CreateCategoryEvent(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) throw { name: "Name Empty" };

      let category = await CategoryEvents.findOne({ where: { name } });
      if (category) throw { name: "Category Not Unique" };
      let newCategory = await CategoryEvents.create({ name });
      res.status(201).json({
        message: `category with name ${newCategory.name} create successfully`,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ CreateCategoryEvent:",
        error
      );
      next(error);
    }
  }
};
