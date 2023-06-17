"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoryEventsData = require("../data/db.json").Categories;
    categoryEventsData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("CategoryEvents", categoryEventsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CategoryEvents", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  },
};
