"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.hasMany(models.Staff, {
        foreignKey: "adminId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Admin.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "email must be unique",
        },
        allowNull: false,
        validate: {
          isEmail: {
            msg: "email format false",
          },
          notNull: {
            msg: "email cannot null",
          },
          notEmpty: {
            msg: "email cannot null",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot null",
          },
          notEmpty: {
            msg: "password cannot null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
