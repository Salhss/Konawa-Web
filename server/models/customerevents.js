"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerEvents extends Model {
    static associate(models) {
      CustomerEvents.belongsTo(models.Customer);
      CustomerEvents.belongsTo(models.Events);
    }
  }
  CustomerEvents.init(
    {
      EventId: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CustomerEvents",
    }
  );
  return CustomerEvents;
};
