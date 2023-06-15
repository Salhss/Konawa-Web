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
    const newCustomer1 = {
      email: "customer1@mail.com",
      password: "12345",
      refreshToken: "blablalbalabla",
      isMember: "false",
      isGoldMember: "false",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newCustomer2 = {
      email: "customer2@mail.com",
      password: "12345",
      refreshToken: "blablalbalabla",
      isMember: "true",
      isGoldMember: "false",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newCustomer3 = {
      email: "customer3@mail.com",
      password: "12345",
      refreshToken: "blablalbalabla",
      isMember: "false",
      isGoldMember: "true",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await sequelize.queryInterface.bulkInsert("Admins", [newAdmin], {});
    await sequelize.queryInterface.bulkInsert(
      "Staffs",
      [newStaff, newStaff2],
      {}
    );
    await sequelize.queryInterface.bulkInsert(
      "Customers",
      [newCustomer1, newCustomer2, newCustomer3],
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
    await sequelize.queryInterface.bulkDelete("Customers", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.test.js:93 ~ afterAll ~ error:", error);
  }
});

describe("Success Process", function () {
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
