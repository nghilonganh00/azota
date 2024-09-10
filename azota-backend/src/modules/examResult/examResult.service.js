import db from "../../models";
import examResultMethod from "./examResult.method";

const examResultService = {
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
