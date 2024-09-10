"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scorePerQuestion: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      questionTopic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rawIndex: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      questionType: {
        allowNull: false,
        type: Sequelize.STRING(30),
        defaultValue: "MULTIPLE_CHOICE",
      },
      questionMethod: {
        type: Sequelize.STRING,
      },
      questionExplain: {
        type: Sequelize.STRING,
      },
      examId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Exams",
          key: "id",
        },
      },
      questionPartId: {
        type: Sequelize.INTEGER,
        references: {
          model: "QuestionParts",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Questions");
  },
};
