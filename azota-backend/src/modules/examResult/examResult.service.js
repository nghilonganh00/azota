import db from "../../models";
import examResultMethod from "./examResult.method";

const examResultService = {
  getLatestStudentResultByExamId: async (examId) => {
    try {
      const studentExamRecords = await db.sequelize.query(
        `
      SELECT 
          s.id AS studentId,
          s.studentName,
          er.id AS examResultId,
          er.examresStarted,
          er.examresAnswers,
          er.examId,
          er.studentId,
          er.createdAt,
          er.updatedAt
      FROM 
          Students s
      JOIN 
          ExamResults er ON s.id = er.studentId
      WHERE 
          er.examId = :examId
      ORDER BY 
          er.createdAt DESC
      LIMIT 1;
    `,
        {
          replacements: { examId: examId },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const studentExamResults = await Promise.all(
        studentExamRecords.map(async (row) => {
          const markObj = await examResultMethod.markExam(row.examResultId);

          return {
            studentId: row.studentId,
            studentName: row.studentName,
            ExamResults: [
              {
                id: row.examResultId,
                examresStarted: row.examresStarted,
                examresAnswers: row.examresAnswers,
                examId: row.examId,
                mark: markObj.mark,
                studentId: row.studentId,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
              },
            ],
          };
        })
      );

      return studentExamResults;
    } catch (error) {
      throw error;
    }
  },
  getAssignedByClassLatest: async (examId, classId) => {
    try {
      const studentExamRecords = await db.sequelize.query(
        `
          SELECT 
              s.id AS studentId,
              s.studentName,
              s.classId,
              er.id AS examResultId,
              er.examresStarted,
              er.examresAnswers,
              er.examId,
              er.studentId,
              er.createdAt,
              er.updatedAt
          FROM 
              Students AS s
          JOIN 
              ExamResults AS er ON er.studentId = s.id AND er.examId = :examId
          WHERE 
              s.classId = :classId
          ORDER BY 
              er.createdAt DESC
          LIMIT 1;
        `,
        {
          replacements: { examId: examId, classId: classId },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const studentExamResults = await Promise.all(
        studentExamRecords.map(async (row) => {
          const markObj = await examResultMethod.markExam(row.examResultId);

          return {
            studentId: row.studentId,
            studentName: row.studentName,
            ExamResults: [
              {
                id: row.examResultId,
                examresStarted: row.examresStarted,
                examresAnswers: row.examresAnswers,
                examId: row.examId,
                mark: markObj.mark,
                studentId: row.studentId,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
              },
            ],
          };
        })
      );

      return studentExamResults;
    } catch (error) {
      throw error;
    }
  },
  getAnswersById: async (examResultId) => {
    try {
      const examResult = await db.ExamResult.findByPk(examResultId, {
        attributes: [
          "id",
          "examresStarted",
          "examresAnswers",
          "examId",
          "studentId",
          "studentId",
          "createdAt",
          "updatedAt",
        ],
      });

      return examResult;
    } catch (error) {
      throw error;
    }
  },
  getHistory: async (examId, studentId) => {
    try {
      const examResults = await db.ExamResult.findAll({
        where: {
          examId: examId,
          studentId: studentId,
        },
        attributes: [
          "id",
          "examresStarted",
          "examresSaved",
          // "examresAnswers",
          "examId",
          "studentId",
          "studentId",
          "createdAt",
          "updatedAt",
        ],
      });

      const history = await Promise.all(
        examResults.map(async (examResult) => {
          const { mark } = await examResultMethod.markExam(examResult.id);

          return {
            ...examResult.toJSON(),
            mark,
          };
        })
      );

      return history;
    } catch (error) {
      throw error;
    }
  },
  getByExam: async (examId) => {
    try {
      const examResults = await db.ExamResult.findAll({
        where: {
          examId: examId,
        },
        attributes: [
          "id",
          "examresStarted",
          "examresSaved",
          "examresAnswers",
          "examId",
          "studentId",
          "studentId",
          "createdAt",
          "updatedAt",
        ],
      });

      return examResults;
    } catch (error) {
      throw Error(`Get Exam Results By ExamId failed: ${error}`);
    }
  },
  create: async ({ examId, studentId, examresAnswers, examresStarted }) => {
    try {
      const newExamResult = await db.ExamResult.create({
        examId,
        studentId: 1,
        examresAnswers,
        examresStarted,
      });

      return newExamResult;
    } catch (error) {
      throw Error(`Create the exam result failed: ${error}`);
    }
  },
};

export default examResultService;
