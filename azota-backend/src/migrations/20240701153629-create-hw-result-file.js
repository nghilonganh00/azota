"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HwResultFiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hwrfName: {
        type: Sequelize.STRING,
      },
      hwrfLink: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hwResultId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "HomeworkResults",
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
    await queryInterface.dropTable("HwResultFiles");
  },
};
