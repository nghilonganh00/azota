"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClassGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClassGroup.hasMany(models.Class, { foreignKey: "classGroupId" });
      ClassGroup.belongsTo(models.User, { foreignKey: "teacherId" });
    }
  }
  ClassGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      classGroupName: DataTypes.STRING,
      teacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClassGroup",
    }
  );
  return ClassGroup;
};
