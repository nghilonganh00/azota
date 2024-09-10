"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Assignment.belongsTo(models.Homework, { foreignKey: "homeworkId" });
      Assignment.belongsTo(models.Class, { foreignKey: "classId" });
    }
  }
  Assignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hashId: { type: DataTypes.STRING, unique: true },
      classId: DataTypes.INTEGER,
      homeworkId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Assignment",
    }
  );
  return Assignment;
};
