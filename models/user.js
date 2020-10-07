"use strict";
const { Model } = require("sequelize");
const profile = require("./profile");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.profiles, {
        as: "profiles",
        foreignKey: {
          name: "profileId",
        },
      });
      user.hasMany(models.Job, {
        as: "jobs",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      profileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
