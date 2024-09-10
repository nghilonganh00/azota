import generateRandomString from "../../utils/generateRandomString";

const db = require("../../models");

const getByHashId = async (hashId) => {
  try {
    const homework = await db.Homework.findOne({
      attributes: [
        "id",
        "homeworkName",
        "homeworkContent",
        "homeworkStartDate",
        "homeworkEndDate",
        "homeworkShowResult",
        "homeworkMustLogin",
        "teacherId",
      ],
      include: [
        {
          model: db.Assignment,
          attributes: [],
          where: { hashId: hashId },
        },
        {
          model: db.HomeworkFile,
        },
      ],
    });
    return homework;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const create = async ({ classId, homeworkId }) => {
  try {
    const hashId = generateRandomString(8);
    const newAssignment = await db.Assignment.create({
      hashId,
      classId,
      homeworkId,
    });
    return newAssignment;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const deleteAllByHomeworkId = async (homeworkId) => {
  try {
    await db.Assignment.destroy({
      where: {
        homeworkId: homeworkId,
      },
    });
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default { getByHashId, create, deleteAllByHomeworkId };
