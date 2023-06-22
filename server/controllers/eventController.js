const { CategoryEvents, Events, StaffHistory } = require("../models");

module.exports = class EventController {
  static async CreateCategoryEvent(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) throw { name: "Name Empty" };

      let creator;
      if (req.admin) {
        creator = req.admin.email;
      } else if (req.staff) {
        creator = req.staff.email;
      }
      let category = await CategoryEvents.findOne({ where: { name } });
      if (category) throw { name: "Category Not Unique" };
      let newCategory = await CategoryEvents.create({ name });

      await StaffHistory.create({
        name: "Category",
        description: `New Category have been created by ${creator}`,
        updatedBy: creator,
      });
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
  static async ReadCategory(_, res, next) {
    try {
      let categories = await CategoryEvents.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(categories);
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ CategoryLists:",
        error
      );
      next(error);
    }
  }
  static async UpdateCategory(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      if (!id) throw { name: "Id Empty" };

      let category = await CategoryEvents.findByPk(id);
      if (!category) throw { name: "NotFound" };

      await CategoryEvents.update(
        { name: name },
        { where: { id: category.id } }
      );

      let updatedCategory = await CategoryEvents.findByPk(id);

      let creator;
      if (req.admin) {
        creator = req.admin.email;
      } else if (req.staff) {
        creator = req.staff.email;
      }

      await StaffHistory.create({
        name: "Category",
        description: `Category with id ${id} have been updated by ${creator}`,
        updatedBy: creator,
      });
      res.status(200).json({
        message: `category ${category.name} updated to ${updatedCategory.name} successfully`,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ UpdateCategory:",
        error
      );
      next(error);
    }
  }
  static async DeleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      let category = await CategoryEvents.findByPk(id);
      if (!category) throw { name: "NotFound" };

      await CategoryEvents.destroy({ where: { id: id } });

      await StaffHistory.create({
        name: "Category",
        description: `Category with id ${id} have been deleted by ${req.admin.email}`,
        updatedBy: req.admin.email,
      });

      res
        .status(200)
        .json({ message: `category ${category.name} delete successfully` });
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ DeleteCategory:",
        error
      );
      next(error);
    }
  }

  static async CreateEvent(req, res, next) {
    try {
      const requiredFields = [
        "summary",
        "description",
        "location",
        "startDateTime",
        "endDateTime",
        "imageUrl",
        "categoryId",
        "isBigEvent",
      ];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          throw { name: "Input Empty" };
        }
      }
      let user;
      if (req.admin) {
        user = req.admin.email;
      } else if (req.staff) {
        user = req.staff.email;
      }
      let input = { ...req.body, creator: user };
      let newEvents = await Events.create(input);
      await StaffHistory.create({
        name: "Event",
        description: `Event have been created by ${user}`,
        updatedBy: user,
      });
      res.status(201).json(newEvents);
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ CreateEvent:",
        error
      );
      next(error);
    }
  }
  static async ReadEvents(_, res, next) {
    try {
      let events = await Events.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(events);
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ ReadEvents:",
        error
      );
      next(error);
    }
  }
  static async UpdateEvent(req, res, next) {
    try {
      const { id } = req.params;
      const requiredFields = [
        "summary",
        "description",
        "location",
        "startDateTime",
        "endDateTime",
        "imageUrl",
        "categoryId",
        "isBigEvent",
      ];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          throw { name: "Input Empty" };
        }
      }

      let eventById = await Events.findByPk(id);
      if (!eventById) throw { name: "NotFound" };

      await Events.update(
        {
          summary: req.body.summary,
          description: req.body.description,
          location: req.body.location,
          startDateTime: req.body.startDateTime,
          endDateTime: req.body.endDateTime,
          imageUrl: req.body.imageUrl,
          categoryId: req.body.categoryId,
          isBigEvent: req.body.isBigEvent,
        },
        { where: { id } }
      );

      let creator;
      if (req.admin) {
        creator = req.admin.email;
      } else if (req.staff) {
        creator = req.staff.email;
      }

      await StaffHistory.create({
        name: "Event",
        description: `Event with id ${id} have been updated by ${creator}`,
        updatedBy: creator,
      });

      res
        .status(200)
        .json({ message: `event with id ${id} updated successfully` });
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ UpdateEvent:",
        error
      );
      next(error);
    }
  }
  static async DeleteEvent(req, res, next) {
    try {
      const { id } = req.params;
      let event = await Events.findByPk(id);
      if (!event) throw { name: "NotFound" };

      if (req.staff) {
        if (req.staff.email != event.creator) throw { name: "Forbidden" };
      }

      await Events.destroy({ where: { id } });

      let creator;
      if (req.admin) {
        creator = req.admin.email;
      } else if (req.staff) {
        creator = req.staff.email;
      }

      await StaffHistory.create({
        name: "Event",
        description: `Event with id ${id} have been deleted by ${creator}`,
        updatedBy: creator,
      });

      res
        .status(200)
        .json({ message: `event with id ${id} delete successfully` });
    } catch (error) {
      console.log(
        "🚀 ~ file: eventController.js ~ EventController ~ DeleteEvent:",
        error
      );
      next(error);
    }
  }
};
