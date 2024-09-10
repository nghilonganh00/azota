"use strict";
const { Model } = require("sequelize");
const db = require(".");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.User, { foreignKey: "userId" });
      Student.belongsTo(models.Class, {
        foreignKey: "classId",
        as: "students",
      });
      Student.belongsToMany(models.Homework, {
        through: models.HomeworkResult,
        foreignKey: "studentId",
      });
      Student.hasMany(models.HomeworkResult);

      Student.belongsToMany(models.Exam, {
        through: models.ExamResult,
        foreignKey: "studentId",
      });
      Student.hasMany(models.ExamResult, { foreignKey: "studentId" });
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentName: DataTypes.STRING,
      identificationNumber: DataTypes.INTEGER,
      studentDOB: DataTypes.DATEONLY,
      studentGender: DataTypes.BOOLEAN,
      studentPhone: DataTypes.STRING(20),
      studentEmail: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
      },
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
