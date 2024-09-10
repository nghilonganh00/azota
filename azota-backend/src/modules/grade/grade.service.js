import db from "../../models";

const gradeService = {
  getAll: async () => {
    try {
      const grades = await db.Grade.findAll();

      return grades;
    } catch (error) {
      throw new Error(`Error in getAll of gradeService: ${error}`);
    }
  },
};

export default gradeService;
