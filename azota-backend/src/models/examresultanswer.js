"use strict";
const { mode } = require("crypto-js");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamResultAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamResultAnswer.belongsTo(models.ExamResult, {
        foreignKey: "examresId",
      });
      ExamResultAnswer.belongsTo(models.Question, {
        foreignKey: "questionId",
      });
    }
  }
  ExamResultAnswer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eraAnswer: DataTypes.STRING,
      questionId: DataTypes.INTEGER,
      examresId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExamResultAnswer",
    }
  );
  return ExamResultAnswer;
};
