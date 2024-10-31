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

  // Truy vấn danh sách ID các sinh viên được giao 1 bài kiểm tra cụ thể
  getAssignedExamStudentIds: async (examId) => {
    try {
      const studentIdRecords = await db.sequelize.query(
        `
        SELECT 
          s.id
        FROM 
          Students as s
        JOIN
          ExamByStudents as es ON es.examId = :examId
      `,
        {
          replacements: { examId: examId },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      return studentIdRecords;
    } catch (error) {
      throw new Error(`Error in getAssignedExamStudentIds service: ${error}`);
    }
  },

  //Cập nhật danh sách sinh viên được giao bài kiểm tra
  syncAssignedStudents: async (examId, assignedStudentIds) => {
    try {
      const existingStudentRecords = await db.sequelize.query(
        `
          SELECT es.studentId
          From ExamByStudents as es
          WHERE es.examId = :examId
        `,
        {
          replacements: { examId },
          type: db.Sequelize.QueryTypes.SELECT,
        }
      );

      const existingStudentIds = existingStudentRecords.map(
        (record) => record.studentId
      );

      const studentIdsToRemove = existingStudentIds.filter(
        (id) => !assignedStudentIds.includes(id)
      );

      const studentIdsToCreate = assignedStudentIds.filter(
        (id) => !existingStudentIds.includes(id)
      );

      if (studentIdsToRemove.length > 0) {
        await db.ExamByStudent.destroy({
          where: {
            examId: examId,
            studentId: studentIdsToRemove,
          },
        });
      }

      if (studentIdsToCreate.length > 0) {
        for (const studentId of studentIdsToCreate) {
          await db.ExamByStudent.create({
            examId: examId,
            studentId: studentId,
          });
        }
      }
    } catch (error) {
      throw new Error(`Error in getAssignedExamStudentIds service: ${error}`);
    }
  },
};

export default ExamByStudentService;
