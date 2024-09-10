"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionPart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionPart.hasMany(models.Question, { foreignKey: "questionPartId" });
      QuestionPart.belongsTo(models.Exam, { foreignKey: "examId" });
    }
  }
  QuestionPart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      questionPartName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      examId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "QuestionPart",
    }
  );
  return QuestionPart;
};
