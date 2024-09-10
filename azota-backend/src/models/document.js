"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.hasMany(models.DocumentFile, {
        foreignKey: "docId",
      });
      Document.belongsTo(models.Subject);
    }
  }
  Document.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      docName: DataTypes.STRING,
      subjectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
