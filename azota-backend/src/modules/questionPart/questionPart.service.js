import db from "../../models";
import question from "../../models/question";

const questionPartService = {
  create: async ({ questionPartName, examId }) => {
    try {
      const newQuestionPart = db.QuestionPart.create({
        questionPartName,
        examId,
      });

      return newQuestionPart;
    } catch (error) {
      throw error;
    }
  },
};

export default questionPartService;
