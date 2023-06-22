const request = require("supertest");
const { it, describe, expect, beforeAll, afterAll } = require("@jest/globals");
const app = require("../app");
const { sequelize, CategoryEvents, Events } = require("../models");
const { hashPassword, signToken } = require("../helpers/helper");
const EventController = require("../controllers/eventController");

let adminToken;
let adminEmail;
let staffToken;
let staffEmail;
let staffTokenInactive;
let staffInactiveEmail;
let categorySelected;
beforeAll(async () => {
  try {
    const newAdmin = {
      email: "admin1@mail.com",
      password: hashPassword("12345"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    adminToken = signToken({ id: newAdmin.id, email: newAdmin.email });
    adminEmail = newAdmin.email;
    const newStaff = {
      email: "staff1@mail.com",
      password: hashPassword("12345"),
      username: "staff1",
      adminId: 1,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    staffToken = signToken({ id: newStaff.id, email: newStaff.email });
    staffEmail = newStaff.email;
    const newStaff2 = {
      email: "staff2@mail.com",
      password: hashPassword("12345"),
      username: "staff2",
      adminId: 1,
      status: "inactive",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    staffTokenInactive = signToken({
      id: newStaff2.id,
      email: newStaff2.email,
    });
    staffInactiveEmail = newStaff2.email;

    const category = [
      {
        name: "Senam Akbar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Senam Mingguan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Senam Harian",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    categorySelected = category[2];

    const events = [
      {
        summary: "Senam Bersama KONAWA",
        description: "Senam mingguan yang dilaksanakan di Lapangan Syekh Yusuf",
        location: "Lapangan Syekh Yusuf",
        startDateTime: "2023-06-04T7:00:00.000Z",
        endDateTime: "2023-06-04T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 1,
        isBigEvent: false,
        EventId: "akan diupdate",
        creator: "admin1@mail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        summary: "Senam Bersama KTS",
        description: "Senam mingguan yang dilaksanakan di Kodim",
        location: "KODIM 1409/GOWA",
        startDateTime: "2023-07-05T7:00:00.000Z",
        endDateTime: "2023-07-05T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: false,
        EventId: "akan diupdate",
        creator: "staff1@mail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await sequelize.queryInterface.bulkInsert("Admins", [newAdmin], {});
    await sequelize.queryInterface.bulkInsert(
      "Staffs",
      [newStaff, newStaff2],
      {}
    );
    await sequelize.queryInterface.bulkInsert("CategoryEvents", category, {});
    await sequelize.queryInterface.bulkInsert("Events", events, {});
  } catch (error) {
    console.log("🚀 ~ file: event.test.js ~ beforeAll ~ error:", error);
  }
});

afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete("Admins", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
    await sequelize.queryInterface.bulkDelete("Staffs", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
    await sequelize.queryInterface.bulkDelete("CategoryEvents", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
    await sequelize.queryInterface.bulkDelete("Events", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  } catch (error) {
    console.log("🚀 ~ file: event.test.js ~ afterAll:", error);
  }
});

describe("Success Proccess", function () {
  describe("Success CRUD Category Events", function () {
    it("success create category event by admin account", async () => {
      const newCategory = {
        name: "Senam Bahagia",
      };
      const response = await request(app)
        .post("/categoryEvent")
        .set("access_token", adminToken)
        .send(newCategory);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `category with name ${newCategory.name} create successfully`,
      });
    });
    it("success create category event by active staff account", async () => {
      const newCategory = {
        name: "Senam Cantik",
      };
      const response = await request(app)
        .post("/categoryEvent")
        .set("access_token", staffToken)
        .send(newCategory);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `category with name ${newCategory.name} create successfully`,
      });
    });
    it("success return all categories", async () => {
      const response = await request(app)
        .get("/categoryEvent")
        .set("access_token", adminToken);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
    });
    it("success update category by admin", async () => {
      const category = {
        name: "Senam Bahagia",
      };
      const response = await request(app)
        .patch("/categoryEvent/2")
        .set("access_token", adminToken)
        .send({ name: category.name });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `category Senam Mingguan updated to ${category.name} successfully`,
      });
    });
    it("success update category by staff", async () => {
      const category = {
        name: "Senam Bahagia",
      };
      const response = await request(app)
        .patch("/categoryEvent/3")
        .set("access_token", staffToken)
        .send({ name: category.name });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `category ${categorySelected.name} updated to ${category.name} successfully`,
      });
    });
    it("success delete category", async () => {
      const response = await request(app)
        .delete("/categoryEvent/3")
        .set("access_token", adminToken);
      const deletedCategory = await CategoryEvents.findByPk(3);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: `category Senam Bahagia delete successfully`,
      });
      expect(deletedCategory).toBeNull();
    });
  });
  describe("Success CRUD Events", function () {
    it("success create new event by admin", async () => {
      const newEvent = {
        summary: "Senam Bahagia Bersama",
        description: "Senam Bahagia Bersama di Lapangan Syekh Yusuf",
        location: "Lapangan Syekh Yusuf",
        startDateTime: "2023-06-04T7:00:00.000Z",
        endDateTime: "2023-06-04T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: "false",
        EventId: "blabla",
      };
      const response = await request(app)
        .post("/event")
        .set("access_token", adminToken)
        .send(newEvent);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("summary");
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("location");
      expect(response.body).toHaveProperty("startDateTime");
      expect(response.body).toHaveProperty("endDateTime");
      expect(response.body).toHaveProperty("imageUrl");
      expect(response.body).toHaveProperty("categoryId");
      expect(response.body).toHaveProperty("isBigEvent");
      expect(response.body).toHaveProperty("EventId");
      expect(response.body).toHaveProperty("creator");
    });
    it("success create new event by staff", async () => {
      const newEvent = {
        summary: "Senam Bahagia Bersama",
        description: "Senam Bahagia Bersama di Lapangan Syekh Yusuf",
        location: "Lapangan Syekh Yusuf",
        startDateTime: "2023-06-04T7:00:00.000Z",
        endDateTime: "2023-06-04T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: "false",
        EventId: "blabla",
      };
      const response = await request(app)
        .post("/event")
        .set("access_token", staffToken)
        .send(newEvent);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("summary");
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("location");
      expect(response.body).toHaveProperty("startDateTime");
      expect(response.body).toHaveProperty("endDateTime");
      expect(response.body).toHaveProperty("imageUrl");
      expect(response.body).toHaveProperty("categoryId");
      expect(response.body).toHaveProperty("isBigEvent");
      expect(response.body).toHaveProperty("EventId");
      expect(response.body).toHaveProperty("creator");
    });
    it("success return all events", async () => {
      const response = await request(app).get("/event");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toBeInstanceOf(Object);
      expect(response.body[0]).toHaveProperty("summary");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("location");
      expect(response.body[0]).toHaveProperty("startDateTime");
      expect(response.body[0]).toHaveProperty("endDateTime");
      expect(response.body[0]).toHaveProperty("imageUrl");
      expect(response.body[0]).toHaveProperty("categoryId");
      expect(response.body[0]).toHaveProperty("isBigEvent");
      expect(response.body[0]).toHaveProperty("EventId");
      expect(response.body[0]).toHaveProperty("creator");
    });
    it("success update event by admin", async () => {
      let event = {
        summary: "Senam Bahagia AURA",
        description: "Senam Bersama AURA di Basecamp AURA",
        location: "Basecamp AURA",
        startDateTime: "2023-06-05T7:00:00.000Z",
        endDateTime: "2023-06-05T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: "true",
        EventId: "blabla",
      };
      const response = await request(app)
        .patch("/event/2")
        .set("access_token", adminToken)
        .send(event);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: "event with id 2 updated successfully",
      });
    });
    it("success update event by staff", async () => {
      let event = {
        summary: "Senam Bersama KTS",
        description: "Senam mingguan yang dilaksanakan di Kodim",
        location: "KODIM 1409/GOWA",
        startDateTime: "2023-07-05T7:00:00.000Z",
        endDateTime: "2023-07-05T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: "false",
        EventId: "akan diupdate",
      };
      const response = await request(app)
        .patch("/event/2")
        .set("access_token", staffToken)
        .send(event);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: "event with id 2 updated successfully",
      });
    });
    it("success delete event by admin", async () => {
      const response = await request(app)
        .delete("/event/3")
        .set("access_token", adminToken);
      const deletedEvent = await Events.findByPk(3);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: `event with id 3 delete successfully`,
      });
      expect(deletedEvent).toBeNull();
    });
    it("success delete event by staff", async () => {
      const response = await request(app)
        .delete("/event/4")
        .set("access_token", adminToken);
      const deletedEvent = await Events.findByPk(3);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: `event with id 4 delete successfully`,
      });
      expect(deletedEvent).toBeNull();
    });
  });
});

describe("Error Process", function () {
  describe("Error CRUD Category Events", function () {
    it("error when name null", async () => {
      const response = await request(app)
        .post("/categoryEvent")
        .set("access_token", adminToken);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `name must be required`,
      });
    });
    it("error when name empty string", async () => {
      const newCategory = {
        name: "",
      };
      const response = await request(app)
        .post("/categoryEvent")
        .set("access_token", adminToken)
        .send(newCategory);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `name must be required`,
      });
    });
    it("error when creating a category that already exists in the database", async () => {
      const newCategory = {
        name: "Senam Akbar",
      };
      const response = await request(app)
        .post("/categoryEvent")
        .set("access_token", adminToken)
        .send(newCategory);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `Category have beed created, create a new one!`,
      });
    });
    it("error when created by inactive staff", async () => {
      const newCategory = {
        name: "Senam Bersama",
      };
      const response = await request(app)
        .post("/categoryEvent")
        .set("access_token", staffTokenInactive)
        .send(newCategory);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `You're not authenticated!`,
      });
    });
    it("error and call next() if an error occurs", async () => {
      const next = jest.fn();
      CategoryEvents.findAll = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));

      await EventController.ReadCategory(null, null, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
    it("error when data category not found on UpdateCategory", async () => {
      const category = {
        name: "Senam Bahagia",
      };
      const response = await request(app)
        .patch("/categoryEvent/20")
        .set("access_token", adminToken)
        .send({ name: category.name });
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `Data Not Found!`,
      });
    });
    it("error when inactive staff try to update category", async () => {
      const category = {
        name: "Senam Bahagia",
      };
      const response = await request(app)
        .patch("/categoryEvent/2")
        .set("access_token", staffTokenInactive)
        .send({ name: category.name });
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `You're not authenticated!`,
      });
    });
    it("error when category is deleted other than admin", async () => {
      const response = await request(app)
        .delete("/categoryEvent/4")
        .set("access_token", staffToken);
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: "You're not authorizated!",
      });
    });
    it("error when data category not found on DeleteCategory", async () => {
      const response = await request(app)
        .delete("/categoryEvent/40")
        .set("access_token", adminToken);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Data Not Found!",
      });
    });
  });
  describe("Error CRUD Event", function () {
    it("error when some inputs empty at create", async () => {
      const newEvent = {
        summary: "Senam Bahagia Bersama",
        description: "Senam Bahagia Bersama di Lapangan Syekh Yusuf",
        location: "Lapangan Syekh Yusuf",
        startDateTime: "2023-06-04T7:00:00.000Z",
        endDateTime: "2023-06-04T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: "",
      };
      const response = await request(app)
        .post("/event")
        .set("access_token", adminToken)
        .send(newEvent);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `Cannot empty this field`,
      });
    });
    it("error and call next() if an error occurs", async () => {
      const next = jest.fn();
      Events.findAll = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));

      await EventController.ReadEvents(null, null, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
    it("error when some inputs empty at update", async () => {
      const event = {
        summary: "Senam Bahagia Bersama",
        description: "Senam Bahagia Bersama di Lapangan Syekh Yusuf",
        location: "Lapangan Syekh Yusuf",
        startDateTime: "2023-06-04T7:00:00.000Z",
        endDateTime: "2023-06-04T10:00:00.000Z",
        imageUrl:
          "https://pbs.twimg.com/media/Fvux38uakAEDLb2?format=jpg&name=large",
        categoryId: 2,
        isBigEvent: "",
      };
      const response = await request(app)
        .patch("/event/2")
        .set("access_token", adminToken)
        .send(event);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: `Cannot empty this field`,
      });
    });
    it("error when delete id not found", async () => {
      const response = await request(app)
        .delete("/event/300")
        .set("access_token", adminToken);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: `Data Not Found!`,
      });
    });
    it("error when staff to delete, return forbidden", async () => {
      const response = await request(app)
        .delete("/event/1")
        .set("access_token", staffToken);
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: `You're not authorizated!`,
      });
    });
  });
});
