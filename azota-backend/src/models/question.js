"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Exam, { foreignKey: "examId" });
      Question.hasMany(models.ExamResultAnswer, { foreignKey: "questionId" });
      Question.belongsTo(models.QuestionPart, { foreignKey: "questionPartId" });
      Question.hasMany(models.Option);
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      scorePerQuestion: DataTypes.FLOAT,
      rawIndex: DataTypes.INTEGER,
      questionTopic: DataTypes.STRING,
      questionType: DataTypes.STRING(30),
      questionMethod: DataTypes.STRING,
      questionExplain: DataTypes.STRING,
      examId: DataTypes.INTEGER,
      questionPartId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
