import db from "../../models";

const subjectService = {
  getAll: async () => {
    try {
      const subjects = await db.Subject.findAll();

      return subjects;
    } catch (error) {
      throw new Error(`Error in getAll of subjectService: ${error}`);
    }
  },
};

export default subjectService;
