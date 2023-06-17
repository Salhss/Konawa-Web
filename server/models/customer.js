"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsToMany(models.Events, {
        through: models.CustomerEvents,
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  Customer.init(
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
      refreshToken: DataTypes.TEXT,
      isMember: DataTypes.BOOLEAN,
      isGoldMember: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
