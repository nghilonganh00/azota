"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Exams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hashId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      examName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      examType: {
        type: Sequelize.ENUM("TEST", "PRATICE"),
        defaultValue: "TEST",
      },
      examAssignType: {
        type: Sequelize.ENUM("ALL", "CLASS", "STUDENT"),
        defaultValue: "ALL",
      },
      examDuration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      examStart: {
        type: Sequelize.DATE,
      },
      examEnd: { type: Sequelize.DATE },
      isPublish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      examLimitSubmit: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isRandomQuestion: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isHideGroupQuestionTitle: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isSectionsStartingFromQuestion1: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showResult: {
        type: Sequelize.ENUM("NO", "SUBMITTED", "ALL_SUBMITTED"),
        defaultValue: "NO",
      },
      showAnswer: {
        type: Sequelize.ENUM(
          "NO",
          "SUBMITTED",
          "ALL_SUBMITTED",
          "REACHED_POINT"
        ),
        defaultValue: "NO",
      },
      fee: {
        type: Sequelize.ENUM("FREE", "TEST", "EXPLAIN"),
        defaultValue: "FREE",
      },
      header: {
        type: Sequelize.STRING,
      },
      examSubmitCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      teacherId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      gradeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Grades",
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
      purposeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Purposes",
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
    await queryInterface.dropTable("Exams");
  },
};
