import db from "../../models";

const examByClassService = {
  getAllByExamId: async (examId) => {
    try {
      const assignedClasses = await db.ExamByClass.findAll({
        where: { examId: examId },
        // attributes: { exclude: ["ExamId", "ClassId"] },
      });

      return assignedClasses;
    } catch (error) {
      throw new Error("Error in examByClassService: ", error);
    }
  },
};

export default examByClassService;
