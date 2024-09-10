"use strict";
const { Model } = require("sequelize");
const db = require(".");
module.exports = (sequelize, DataTypes) => {
  class HomeworkResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HomeworkResult.hasMany(models.HwResultFile, { foreignKey: "hwResultId" });
      HomeworkResult.belongsTo(models.Student, {
        foreignKey: "studentId",
      });
      HomeworkResult.belongsTo(models.Homework, { foreignKey: "homeworkId" });
    }
  }
  HomeworkResult.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      homeworkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: DataTypes.STRING,
      resendRequest: DataTypes.BOOLEAN,
      resendNote: DataTypes.STRING,
      point: DataTypes.FLOAT,
      confirmedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "HomeworkResult",
    }
  );
  return HomeworkResult;
};
