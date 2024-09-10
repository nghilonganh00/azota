// import db from "../../models";

import db from "../../models";

const optionService = {
  create: async ({ optionContent, isAnswer, questionId }) => {
    try {
      const newOption = db.Option.create({
        optionContent,
        isAnswer,
        questionId,
      });

      return newOption;
    } catch (error) {
      throw error;
    }
  },
  changeIsAnswer: async (optionId) => {
    try {
      const option = await db.Option.findByPk(optionId);
      const optionObj = await option.toJSON();
      option.update({
        isAnswer: !option.isAnswer,
      });

      return optionObj;
    } catch (error) {
      throw new Error("Error in changeInAnswer of optionService: " + error);
    }
  },
};

export default optionService;
