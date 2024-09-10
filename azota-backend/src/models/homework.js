"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Homework extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Teacher makes the homework
      Homework.belongsTo(models.User, {
        foreignKey: "teacherId",
        as: "Teacher",
      });
      //Assigment for the classes
      Homework.hasMany(models.Assignment);
      Homework.belongsToMany(models.Class, {
        through: models.Assignment,
        foreignKey: "homeworkId",
      });
      //Result of student
      Homework.belongsToMany(models.Student, {
        through: models.HomeworkResult,
        foreignKey: "homeworkId",
      });
      Homework.hasMany(models.HomeworkResult);
      //Files in homework
      Homework.hasMany(models.HomeworkFile);
    }
  }
  Homework.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeworkName: DataTypes.STRING,
      homeworkContent: DataTypes.STRING,
      homeworkStartDate: DataTypes.DATE,
      homeworkEndDate: DataTypes.DATE,
      homeworkShowResult: DataTypes.BOOLEAN,
      homeworkMustLogin: DataTypes.BOOLEAN,
      isInTrash: DataTypes.BOOLEAN,
      teacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Homework",
    }
  );
  return Homework;
};
