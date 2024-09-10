"use strict";
const { Model } = require("sequelize");
const homework = require("./homework");
module.exports = (sequelize, DataTypes) => {
  class HwResultFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HwResultFile.belongsTo(models.HomeworkResult);
    }
  }
  HwResultFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hwrfName: DataTypes.STRING,
      hwrfLink: DataTypes.STRING,
      hwResultId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HwResultFile",
    }
  );
  return HwResultFile;
};
