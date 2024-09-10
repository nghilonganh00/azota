"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Assignments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hashId: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      classId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Classes",
          key: "id",
        },
      },
      homeworkId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Homework", key: "id" },
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
    await queryInterface.dropTable("Assignments");
  },
};
