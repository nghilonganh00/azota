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

  // Truy vấn danh sách sinh viên của 1 lớp và kiểm tra sinh viên có được giao bài kiểm tra không
  // Nếu sinh viên được giao bài đó thì isAssigned = 1. Ngược lại isAssigned = 0
  getExamAssignment: async (classId, examId) => {
    try {
      const studentAssignmentRecords = await db.sequelize.query(
        `
            SELECT
              s.*,
              CASE 
                WHEN es.id IS NOT NULL THEN 1 
                ELSE 0 
              END AS isAssigned
            FROM
              Students AS s
            LEFT JOIN 
              ExamByStudents as es 
            ON 
              es.studentId = s.id AND es.examId = :examId
            WHERE
              s.classId = :classId
          `,
        {
          replacements: { classId: classId, examId: examId },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      return studentAssignmentRecords;
    } catch (error) {
      throw new Error(`Error in getAssignedExam: ${error}`);
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
