"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamResult.hasMany(models.ExamResultAnswer, { foreignKey: "examresId" });
      ExamResult.belongsTo(models.Student, { foreignKey: "studentId" });
      ExamResult.belongsTo(models.Exam, { foreignKey: "examId" });
    }
  }
  ExamResult.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      examresStarted: DataTypes.DATE,
      examresSaved: DataTypes.DATE,
      examresAnswers: DataTypes.STRING,
      studentId: DataTypes.INTEGER,
      examId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExamResult",
    }
  );
  return ExamResult;
};
