const request = require("supertest");
const { it, describe, expect, beforeAll, afterAll } = require("@jest/globals");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword, signToken } = require("../helpers/helper");

let adminToken;
let staffToken;
let staffTokenInactive;
beforeAll(async () => {
  try {
    const newAdmin = {
      email: "admin1@mail.com",
      password: hashPassword("12345"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    adminToken = signToken({ id: newAdmin.id, email: newAdmin.email });
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
  describe("Success Category Events", function () {
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
  });
});

describe("Error Process", function () {
  describe("Error Category Events", function () {
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
        message: `You're not auntheticated!`,
      });
    });
  });
});
