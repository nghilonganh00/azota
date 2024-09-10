"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamByStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamByStudent.belongsTo(models.Exam, {
        foreignKey: "examId",
      });
      ExamByStudent.belongsTo(models.Student, {
        foreignKey: "studentId",
      });
    }
  }
  ExamByStudent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      examId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExamByStudent",
    }
  );
  return ExamByStudent;
};
