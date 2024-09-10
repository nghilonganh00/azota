"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ExamResults", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examresStarted: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      examresSaved: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      examresAnswers: { allowNull: false, type: Sequelize.STRING },
      examresNote: { type: Sequelize.STRING },
      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Students",
          key: "id",
        },
      },
      examId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Exams",
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
    await queryInterface.dropTable("ExamResults");
  },
};
