import db from "../../models";

const examByClassService = {
  getAllByExamId: async (examId) => {
    try {
      const assignedClassRecords = await db.sequelize.query(
        `
          SELECT
            c.*,
            g.ClassGroupName as classGroupName,
            COUNT(s.id) as totalclass
          FROM
            ExamByClasses AS e
          JOIN
            Classes AS c ON e.classId = c.id
          JOIN
            ClassGroups as g ON g.id = c.classGroupId
          LEFT JOIN 
            Students as s ON s.classId = c.id
          WHERE
            e.examId = :examId
          GROUP BY
            c.id
        `,
        {
          replacements: { examId: examId },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const assignedClasses = assignedClassRecords.map((row) => ({
        ...row,
        ClassGroup: {
          classGroupId: row.classGroupId,
          classGroupName: row.classGroupName,
        },
      }));

      return assignedClasses;
    } catch (error) {
      throw new Error(`Error in examByClassService: ${error}`);
    }
  },

  //Cập nhật danh sách các lớp được giao bài kiểm tra
  syncAssignedclasss: async (examId, assignedClassIds) => {
    try {
      const existingClassRecords = await db.sequelize.query(
        `
          SELECT ec.classId
          From ExamByClasses as ec
          WHERE ec.examId = :examId
        `,
        {
          replacements: { examId },
          type: db.Sequelize.QueryTypes.SELECT,
        }
      );

      const existingClassIds = existingClassRecords.map(
        (record) => record.classId
      );

      const classIdsToRemove = existingClassIds.filter(
        (id) => !assignedClassIds.includes(id)
      );

      const classIdsToCreate = assignedClassIds.filter(
        (id) => !existingClassIds.includes(id)
      );

      if (classIdsToRemove.length > 0) {
        await db.ExamByClass.destroy({
          where: {
            examId: examId,
            classId: classIdsToRemove,
          },
        });
      }

      if (classIdsToCreate.length > 0) {
        for (const classId of classIdsToCreate) {
          await db.ExamByClass.create({
            examId: examId,
            classId: classId,
          });
        }
      }
    } catch (error) {
      throw new Error(`Error in getAssignedExamClassIds service: ${error}`);
    }
  },
};

export default examByClassService;
