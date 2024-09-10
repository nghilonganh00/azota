"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ExamByStudents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Exams",
          key: "id",
        },
      },
      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Students",
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
    await queryInterface.dropTable("ExamByStudents");
  },
};
