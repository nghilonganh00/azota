const db = require("../../models");

const ExamByStudentService = {
  getAllByExamId: async (examId) => {
    try {
      const assignedStudents = await db.ExamByStudent.findAll({
        where: { examId: examId },
      });

      return assignedStudents;
    } catch (error) {
      throw new Error("Error in examByClassService: ", error);
    }
  },
};

export default ExamByStudentService;
