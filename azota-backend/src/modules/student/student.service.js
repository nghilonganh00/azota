const db = require("../../models");

const studentService = {
  getAll: async ({ classId = null } = {}) => {
    try {
      const students = await db.Student.findAll({
        where: {
          classId: classId,
        },
        attributes: {
          include: [
            [
              db.sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM HomeworkResults AS homeworkResults 
                  WHERE homeworkResults.studentId = Student.id
                )`),
              "totalHomeworkAnswer",
            ],
          ],
        },
        include: [
          {
            model: db.HomeworkResult,
            attributes: [],
          },
        ],
      });
      return students;
    } catch (error) {
      console.log(error);
    }
  },
  getResultsByClassId: async (classId) => {
    try {
      const students = await db.Student.findAll({
        attributes: [
          "id",
          "studentName",
          "studentGender",
          "studentPhone",
          "studentEmail",
        ],
        where: {
          classId: classId,
        },
        include: [
          {
            model: db.HomeworkResult,
            attributes: [
              "id",
              "note",
              "resendRequest",
              "resendNote",
              "point",
              "confirmedAt",
              "createdAt",
              "updatedAt",
              "studentId",
              "homeworkId",
            ],
            include: [
              {
                model: db.HwResultFile,
                attributes: ["id", "hwrfLink", "hwResultId"],
              },
            ],
          },
        ],
      });

      return students;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  getExamResults: async (examId, classroomId) => {
    try {
      const students = await db.Student.findAll({
        where: { classId: classroomId },
        include: [
          {
            model: db.ExamResult,
            where: { examId: examId },
            attributes: ["id", "examresStarted", "createdAt"],
          },
        ],
      });

      return students;
    } catch (error) {
      throw new Error(`Error in studentService.getExamResults: ${error}`);
    }
  },
  getResultsByHashId: async (hashId) => {
    try {
      const students = await db.Student.findAll({
        include: [
          {
            model: db.Class,
            attributes: [],
            include: [
              {
                model: db.Assignment,
                attributes: [],
                where: { hashId: hashId },
              },
            ],
          },
          {
            model: db.HomeworkResult,
            attributes: [
              "id",
              "studentId",
              "homeworkId",
              "note",
              "resendRequest",
              "resendNote",
              "point",
              "confirmedAt",
            ],
          },
        ],
      });

      return students;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getConfigById: async (id) => {
    try {
      const student = await db.Student.findByPk(id, {
        attributes: ["id", "studentName", "studentGender"],
      });
      return student;
    } catch (error) {
      throw new Error(`Error in getConfigById of studentService: ${error}`);
    }
  },
  confirm: async ({ studentId, userId }) => {
    try {
      const student = await db.Student.update(
        {
          userId: userId,
        },
        {
          where: {
            id: studentId,
          },
        }
      );

      return student;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  create: async ({
    studentName,
    identificationNumber = "",
    studentGender = 0,
    studentPhone = "",
    studentEmail = "",
    userId = null,
    classId,
  } = {}) => {
    try {
      const newStudent = await db.Student.create({
        studentName,
        identificationNumber,
        studentGender,
        studentPhone,
        studentEmail,
        userId,
        classId,
      });

      return newStudent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default studentService;
