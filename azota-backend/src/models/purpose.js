"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purpose extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purpose.hasMany(models.Exam, { foreignKey: "purposeId" });
    }
  }
  Purpose.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      purposeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Purpose",
    }
  );
  return Purpose;
};
