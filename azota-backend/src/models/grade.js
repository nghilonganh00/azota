"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grade.hasMany(models.Subject, { foreignKey: "gradeId" });
      Grade.belongsToMany(models.User, { through: models.TeacherGrade });
      Grade.hasMany(models.Exam, { foreignKey: "gradeId" });
    }
  }
  Grade.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      gradeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Grade",
    }
  );
  return Grade;
};
