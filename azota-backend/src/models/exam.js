"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.hasMany(models.Question, { foreignKey: "examId" });
      Exam.hasMany(models.QuestionPart);

      Exam.hasMany(models.ExamByClass, { foreignKey: "examId" });
      Exam.belongsToMany(models.Class, {
        through: models.ExamByClass,
        as: "AssignedClasses",
      });

      Exam.hasMany(models.ExamByStudent, { foreignKey: "examId" });
      Exam.belongsToMany(models.Student, {
        through: models.ExamByStudent,
        as: "AssignedStudents",
      });

      Exam.belongsToMany(models.Student, {
        through: models.ExamResult,
        foreignKey: "examId",
      });
      Exam.hasMany(models.ExamResult, { foreignKey: "examId" });

      Exam.belongsTo(models.Subject, { foreignKey: "subjectId" });
      Exam.belongsTo(models.Grade, { foreignKey: "gradeId" });
      Exam.belongsTo(models.User, { foreignKey: "teacherId", as: "Author" });
    }
  }
  Exam.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hashId: DataTypes.STRING,
      examName: DataTypes.STRING,
      examAssignType: {
        type: DataTypes.ENUM("ALL", "CLASS", "STUDENT"),
        defaultValue: "ALL",
      },
      examSubmitCount: DataTypes.INTEGER,
      teacherId: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
      purposeId: DataTypes.INTEGER,
      examDuration: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      examType: {
        type: DataTypes.ENUM("TEST", "PRATICE"),
        defaultValue: "TEST",
      },
      examStart: {
        type: DataTypes.DATE,
      },
      examEnd: {
        type: DataTypes.DATE,
      },
      isPublish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      examLimitSubmit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isRandomQuestion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isHideGroupQuestionTitle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isSectionsStartingFromQuestion1: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showResult: {
        type: DataTypes.ENUM("NO", "SUBMITTED", "ALL_SUBMITTED"),
        defaultValue: "NO",
      },
      showAnswer: {
        type: DataTypes.ENUM(
          "NO",
          "SUBMITTED",
          "ALL_SUBMITTED",
          "REACHED_POINT"
        ),
        defaultValue: "NO",
      },
      fee: {
        type: DataTypes.ENUM("FREE", "TEST", "EXPLAIN"),
        defaultValue: "FREE",
      },
      header: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Exam",
    }
  );
  return Exam;
};
