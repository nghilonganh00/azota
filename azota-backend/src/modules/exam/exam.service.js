import db from "../../models/index";
import generateRandomString from "../../utils/generateRandomString";

const examService = {
  create: async ({
    examName,
    examAssignType,
    examSubmitCount,
    gradeId,
    subjectId,
    purposeId,
    teacherId,
  }) => {
    try {
      const hashId = generateRandomString(6);
      const newExam = db.Exam.create({
        examName,
        hashId,
        examAssignType: examAssignType || "ALL",
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        teacherId,
      });

      return newExam;
    } catch (error) {
      throw error;
    }
  },
  getAllPreviews: async (teacherId) => {
    try {
      const exams = db.Exam.findAll({
        where: { teacherId: teacherId },
        attributes: {
          include: [
            [
              db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM ExamResults AS examResults
                    WHERE examResults.examId = Exam.id
                  )`),
              "submitTotal",
            ],
          ],
        },
        include: [
          {
            model: db.ExamResult,
            attributes: [],
            required: false,
          },
        ],
      });

      return exams;
    } catch (error) {
      throw error;
    }
  },
  getDetailByHashId: async (hashId) => {
    try {
      const exam = db.Exam.findOne({
        where: { hashId: hashId },
      });

      if (!exam) {
        throw new Error("Dont exist the config of exam with hashId ", hashId);
      }

      return exam;
    } catch (error) {
      console.log("Error in examService.getConfigByHasId: ", error);
      throw error;
    }
  },
  getConfigByHashId: async (hashId) => {
    try {
      const exam = db.Exam.findOne({
        where: { hashId: hashId },
        attributes: {
          include: [
            [
              db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Questions AS questions
                    WHERE questions.examId = ExamId
                  )`),
              "questionTotal",
            ],
          ],
        },
      });

      if (!exam) {
        throw new Error("Dont exist the config of exam with hashId ", hashId);
      }

      return exam;
    } catch (error) {
      console.log("Error in examService.getConfigByHasId: ", error);
      throw error;
    }
  },

  getById: async (examId) => {
    try {
      const exam = db.Exam.findByPk(examId, {
        include: [
          {
            model: db.Question,
            include: [{ model: db.Option }, { model: db.QuestionPart }],
          },
        ],
      });

      if (!exam) {
        throw new Error("Dont exist the exam with examId ", examId);
      }

      return exam;
    } catch (error) {
      throw error;
    }
  },
  getByHashId: async (hashId) => {
    try {
      const exam = db.Exam.findOne({
        where: { hashId: hashId },
        include: [
          {
            model: db.Question,
            include: [{ model: db.Option }, { model: db.QuestionPart }],
          },
        ],
      });

      if (!exam) {
        throw new Error("Dont exist the exam with hashId ", hashId);
      }

      return exam;
    } catch (error) {
      throw error;
    }
  },
  updateConfigByHashId: async ({
    hashId,
    examName,
    examAssignType,
    examSubmitCount,
    gradeId,
    subjectId,
    purposeId,
    examContent,
  }) => {
    try {
      const exam = await db.Exam.findOne({ where: { hashId: hashId } });
      exam.update({
        examName,
        examAssignType,
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        examContent,
      });

      return exam;
    } catch (error) {
      throw error;
    }
  },
};

export default examService;