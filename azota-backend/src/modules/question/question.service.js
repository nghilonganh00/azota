import question from "../../models/question";

const db = require("../../models");

const questionService = {
  create: async ({
    topic,
    type,
    examId,
    examExplain,
    examMethod,
    questionPartId,
  }) => {
    try {
      const newQuestion = await db.Question.create({
        questionTopic: topic,
        questionType: type,
        examId,
        examExplain,
        examMethod,
        questionPartId,
      });

      return newQuestion;
    } catch (error) {
      throw error;
    }
  },
};

export default questionService;
