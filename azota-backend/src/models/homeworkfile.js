"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HomeworkFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HomeworkFile.belongsTo(models.Homework, { foreignKey: "homeworkId" });
    }
  }
  HomeworkFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeworkId: DataTypes.INTEGER,
      hwfileName: DataTypes.STRING,
      hwfileLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HomeworkFile",
    }
  );
  return HomeworkFile;
};
