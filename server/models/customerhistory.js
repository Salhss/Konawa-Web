"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerHistory extends Model {
    static associate(models) {}
  }
  CustomerHistory.init(
    {
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "event name cannot null" },
          notEmpty: { msg: "event name cannot empty" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "event status cannot null" },
          notEmpty: { msg: "event status cannot empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "CustomerHistory",
    }
  );
  return CustomerHistory;
};
