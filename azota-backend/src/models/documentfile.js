"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DocumentFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DocumentFile.belongsTo(models.Document, {
        foreignKey: "docId",
      });
    }
  }
  DocumentFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      docFileLink: DataTypes.STRING,
      docFileType: DataTypes.STRING(20),
      docId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DocumentFile",
    }
  );
  return DocumentFile;
};
