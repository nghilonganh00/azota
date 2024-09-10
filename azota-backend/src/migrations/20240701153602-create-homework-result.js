"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HomeworkResults", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.STRING,
      },
      resendRequest: {
        type: Sequelize.BOOLEAN,
      },
      resendNote: {
        type: Sequelize.STRING,
      },
      point: {
        type: Sequelize.FLOAT,
      },

      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Students",
          key: "id",
        },
      },
      homeworkId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Homework",
          key: "id",
        },
      },

      confirmedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("HomeworkResults");
  },
};
