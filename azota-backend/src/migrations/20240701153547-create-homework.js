"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Homework", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeworkName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      homeworkContent: {
        type: Sequelize.STRING,
      },
      homeworkStartDate: { type: Sequelize.DATE },
      homeworkEndDate: { type: Sequelize.DATE },
      homeworkShowResult: { type: Sequelize.BOOLEAN },
      homeworkMustLogin: { type: Sequelize.BOOLEAN },
      isInTrash: { type: Sequelize.BOOLEAN },
      teacherId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
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
    await queryInterface.dropTable("Homework");
  },
};
