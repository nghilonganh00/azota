"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      School.belongsTo(models.User);
    }
  }
  School.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      schoolName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "School",
    }
  );
  return School;
};
