"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bar.belongsTo(models.Foo, {
        as: "parent",
        foreignKey: {
          name: "fooId",
        },
      });
    }
  }
  Bar.init(
    {
      name: DataTypes.STRING,
      fooId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bar",
    }
  );
  return Bar;
};
