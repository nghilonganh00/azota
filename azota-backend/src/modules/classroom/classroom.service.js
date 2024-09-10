const db = require("../../models");

const classroomService = {
  getById: async (id) => {
    try {
      const classroom = db.Class.findByPk(id, {
        attributes: [
          "id",
          "className",
          "classYear",
          "teacherId",
          "classGroupId",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: db.ClassGroup,
            attributes: ["id", "classGroupName"],
          },
        ],
      });
      return classroom;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  getByHashId: async (hashId) => {
    try {
      const classroom = db.Class.findOne({
        attributes: [
          "id",
          "className",
          "classYear",
          "teacherId",
          "classGroupId",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: db.Assignment,
            attributes: [],
            where: { hashId: hashId },
          },
          {
            model: db.ClassGroup,
            attributes: ["id", "classGroupName"],
          },
        ],
      });
      return classroom;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};

export default classroomService;
