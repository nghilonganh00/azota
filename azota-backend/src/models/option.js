"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Option.belongsTo(models.Question, { foreignKey: "questionId" });
    }
  }
  Option.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: DataTypes.STRING,
      optionContent: DataTypes.STRING,
      isAnswer: DataTypes.BOOLEAN,
      questionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Option",
    }
  );
  return Option;
};
