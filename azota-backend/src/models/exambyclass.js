"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamByClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamByClass.belongsTo(models.Exam, {
        foreignKey: "examId",
      });
      ExamByClass.belongsTo(models.Class, {
        foreignKey: "classId",
      });
    }
  }
  ExamByClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      examId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExamByClass",
    }
  );
  return ExamByClass;
};
