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
          notNull: "event name cannot null",
          notEmpty: "event name cannot empty",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "event status cannot null",
          notEmpty: "event status cannot empty",
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
