"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeacherSubject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherGradeId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TeacherSubject",
    }
  );
  return TeacherSubject;
};
