"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TeacherSubjects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacherGradeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "TeacherGrades",
          key: "id",
        },
      },
      subjectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Subjects",
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
    await queryInterface.dropTable("TeacherSubjects");
  },
};
