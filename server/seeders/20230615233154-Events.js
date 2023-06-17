"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let eventsData = require("../data/db.json").Events;
    eventsData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Events", eventsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  },
};
