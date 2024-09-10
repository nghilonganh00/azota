"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      studentDOB: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      identificationNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      studentGender: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      studentPhone: {
        type: Sequelize.STRING(20),
      },
      studentEmail: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "Id",
        },
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Classes",
          key: "Id",
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
    await queryInterface.dropTable("Students");
  },
};
