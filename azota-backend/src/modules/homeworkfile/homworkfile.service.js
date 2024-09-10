import db from "../../models";

const homeworkFileService = {
  create: async ({ homeworkId, hwfileName, hwfileLink }) => {
    try {
      const newHomeworkFile = await db.HomeworkFile.create({
        homeworkId,
        hwfileName,
        hwfileLink,
      });
      return newHomeworkFile;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  delete: async (homeworkId) => {
    try {
      await db.HomeworkFile.destroy({
        where: {
          id: homeworkId,
        },
      });
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};

export default homeworkFileService;
