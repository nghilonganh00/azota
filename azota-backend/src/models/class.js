"use strict";
const { mode } = require("crypto-js");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.hasMany(models.Assignment);
      Class.belongsToMany(models.Homework, {
        through: models.Assignment,
        foreignKey: "classId",
      });

      Class.hasMany(models.ExamByClass, { foreignKey: "classId" });
      Class.belongsToMany(models.Exam, { through: models.ExamByClass });

      Class.belongsTo(models.ClassGroup, { foreignKey: "classGroupId" });
      Class.hasMany(models.Student, { foreignKey: "classId", as: "students" });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      className: DataTypes.STRING,
      classYear: DataTypes.STRING(15),
      teacherId: DataTypes.INTEGER,
      classGroupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
