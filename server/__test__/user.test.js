const request = require("supertest");
const { it, describe, expect, beforeAll, afterAll } = require("@jest/globals");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/helper");

beforeAll(async () => {
  try {
    const newAdmin = {
      email: "admin1@mail.com",
      password: hashPassword("12345"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newStaff = {
      email: "staff1@mail.com",
      password: hashPassword("12345"),
      adminId: 1,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newStaff2 = {
      email: "staff2@mail.com",
      password: hashPassword("12345"),
      adminId: 1,
      status: "inactive",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await sequelize.queryInterface.bulkInsert("Admins", [newAdmin], {});
    await sequelize.queryInterface.bulkInsert(
      "Staffs",
      [newStaff, newStaff2],
      {}
    );
  } catch (error) {
    console.log("🚀 ~ file: user.test.js:71 ~ beforeAll ~ er:", er);
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
  } catch (error) {
    console.log("🚀 ~ file: user.test.js:93 ~ afterAll ~ error:", error);
  }
});

describe("Success Process", function () {
  it("should login a created admin account", async () => {
    const admin = {
      email: "admin1@mail.com",
      password: "12345",
    };
    const response = await request(app).post("/adminLogin").send(admin);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token");
  });
  it("should create new admin account", async () => {
    const createdAdmin = {
      email: "admin2@mail.com",
      password: "123456",
    };
    const response = await request(app)
      .post("/adminRegister")
      .send(createdAdmin);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `${createdAdmin.email} have been created`,
    });
  });
});

describe("Error Proccess", function () {
  describe("Error when login admin", function () {
    it("return email must be required when email null", async () => {
      const admin = {
        password: "12345",
      };
      const response = await request(app).post("/adminLogin").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "mail must be required" });
    });
    it("return password must be required when password null", async () => {
      const admin = {
        email: "admin1@mail.com",
      };
      const response = await request(app).post("/adminLogin").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "password must be required" });
    });
    it("return email must be required when email empty string", async () => {
      const admin = {
        email: "",
        password: "12345",
      };
      const response = await request(app).post("/adminLogin").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "email must be required" });
    });
    it("return password must be required when password empty string", async () => {
      const admin = {
        email: "admin1@mail.com",
        password: "",
      };
      const response = await request(app).post("/adminLogin").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "password must be required" });
    });
  });
  describe("Error when create register admin", function () {
    it("return email must be required when email null", async () => {
      const admin = {
        password: "12345",
      };
      const response = await request(app).post("/adminRegister").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "mail must be required" });
    });
    it("return password must be required when password null", async () => {
      const admin = {
        email: "admin2@mail.com",
      };
      const response = await request(app).post("/adminRegister").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "password must be required" });
    });
    it("return email must be required when email empty string", async () => {
      const admin = {
        email: "",
        password: "12345",
      };
      const response = await request(app).post("/adminRegister").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "email must be required" });
    });
    it("return password must be required when password empty string", async () => {
      const admin = {
        email: "admin2@mail.com",
        password: "",
      };
      const response = await request(app).post("/adminRegister").send(admin);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ message: "password must be required" });
    });
  });
});
