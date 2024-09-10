"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.hasMany(models.Document, { foreignKey: "subjectId" });
      Subject.belongsTo(models.Grade);
      Subject.belongsToMany(models.TeacherGrade, {
        through: models.TeacherSubject,
      });
      Subject.hasMany(models.Exam, { foreignKey: "subjectId" });
    }
  }
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Subject",
    }
  );
  return Subject;
};
