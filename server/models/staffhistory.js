"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StaffHistory extends Model {
    static associate(models) {}
  }
  StaffHistory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name cannot null",
          },
          notEmpty: {
            msg: "name cannot null",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "description cannot null",
          },
          notEmpty: {
            msg: "description cannot null",
          },
        },
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "updatedBy cannot null",
          },
          notEmpty: {
            msg: "updatedBy cannot null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "StaffHistory",
    }
  );
  return StaffHistory;
};
