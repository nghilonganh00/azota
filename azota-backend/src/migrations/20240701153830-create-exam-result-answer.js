"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ExamResultAnswers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      eraAnswer: {
        type: Sequelize.STRING,
      },
      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      examresId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ExamResults",
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
    await queryInterface.dropTable("ExamResultAnswers");
  },
};
