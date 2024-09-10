"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Grade, { through: models.TeacherGrade });
      User.hasOne(models.School, { foreignKey: "schoolId" });
      User.hasMany(models.TeacherGrade, { foreignKey: "teacherId" });
      User.hasMany(models.ClassGroup);
      User.hasMany(models.Homework);
      User.belongsToMany(models.Homework, { through: models.HomeworkResult });
      User.hasMany(models.Exam, { foreignKey: "teacherId", as: "Author" });
      User.belongsToMany(models.Exam, { through: models.ExamResult });
      User.hasMany(models.Student);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING(50),
      password: DataTypes.STRING,
      userFullName: DataTypes.STRING,
      userPhone: DataTypes.STRING(20),
      userEmail: DataTypes.STRING,
      userDOB: DataTypes.DATEONLY,
      userGender: DataTypes.BOOLEAN,
      userRole: DataTypes.STRING(10),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
