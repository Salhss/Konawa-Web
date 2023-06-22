"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsTo(models.CategoryEvents, {
        foreignKey: "categoryId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      Events.belongsToMany(models.Customer, {
        through: models.CustomerEvents,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  Events.init(
    {
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "summary cannot null" },
          notEmpty: { msg: "summary cannot empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "description cannot null" },
          notEmpty: { msg: "description cannot empty" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "location cannot null" },
          notEmpty: { msg: "location cannot empty" },
        },
      },
      startDateTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "startDateTime cannot null" },
          notEmpty: { msg: "startDateTime cannot empty" },
        },
      },
      endDateTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "endDateTime cannot null" },
          notEmpty: { msg: "endDateTime cannot empty" },
        },
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "imageUrl cannot null" },
          notEmpty: { msg: "imageUrl cannot empty" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "category cannot null" },
          notEmpty: { msg: "category cannot empty" },
        },
      },
      isBigEvent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "isBigEvent cannot null" },
          notEmpty: { msg: "isBigEvent cannot empty" },
        },
      },
      EventId: DataTypes.STRING,
      creator: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
