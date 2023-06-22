"use strict";
const { genSaltSync, hashSync } = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      Staff.belongsTo(models.Admin, {
        foreignKey: "adminId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Staff.init(
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username cannot null",
          },
          notEmpty: {
            msg: "username cannot null",
          },
        },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: "admin Id cannot empty",
          notNull: "admin Id cannot null",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "status cannot null",
          },
          notEmpty: {
            msg: "status cannot null",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, _) {
          const salt = genSaltSync(5);
          const hash = hashSync(instance.password, salt);
          instance.password = hash;
        },
      },
      sequelize,
      modelName: "Staff",
    }
  );
  return Staff;
};
