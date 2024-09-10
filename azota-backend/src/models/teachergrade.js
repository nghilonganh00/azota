"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeacherGrade.belongsTo(models.User, { foreignKey: "teacherId" });
      TeacherGrade.belongsToMany(models.Subject, {
        through: models.TeacherSubject,
      });
    }
  }
  TeacherGrade.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherId: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TeacherGrade",
    }
  );
  return TeacherGrade;
};
