"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: { allowNull: false, type: Sequelize.STRING(50), unique: true },
      password: { allowNull: false, type: Sequelize.STRING },
      userFullName: { type: Sequelize.STRING },
      userPhone: { type: Sequelize.STRING(20) },
      userEmail: { type: Sequelize.STRING },
      userDOB: { type: Sequelize.DATEONLY },
      userGender: { type: Sequelize.BOOLEAN },
      userRole: {
        type: Sequelize.ENUM("STUDENT", "TEACHER"),
        defaultValue: "STUDENT",
      },
      schoolId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Schools",
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
    await queryInterface.dropTable("Users");
  },
};
