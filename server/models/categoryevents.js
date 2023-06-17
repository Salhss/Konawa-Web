"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryEvents extends Model {
    static associate(models) {
      CategoryEvents.hasMany(models.Events, {
        foreignKey: "categoryId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  CategoryEvents.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: "Category name cannot empty",
          notNull: "Category name cannot null",
        },
      },
    },
    {
      sequelize,
      modelName: "CategoryEvents",
    }
  );
  return CategoryEvents;
};
