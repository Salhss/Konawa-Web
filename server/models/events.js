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
          notNull: "summary cannot null",
          notEmpty: "summary cannot empty",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: "description cannot null",
          notEmpty: "description cannot empty",
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "location cannot null",
          notEmpty: "location cannot empty",
        },
      },
      startDateTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "startDateTime cannot null",
          notEmpty: "startDateTime cannot empty",
        },
      },
      endDateTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "endDateTime cannot null",
          notEmpty: "endDateTime cannot empty",
        },
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: "imageUrl cannot null",
          notEmpty: "imageUrl cannot empty",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "category cannot null",
          notEmpty: "category cannot empty",
        },
      },
      isBigEvent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: "isBigEvent cannot null",
          notEmpty: "isBigEvent cannot empty",
        },
      },
      creator: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
