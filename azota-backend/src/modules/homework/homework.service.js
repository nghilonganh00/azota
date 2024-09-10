import db from "../../models";
import studentService from "../student/student.service";

const isExist = async (id) => {
  try {
    const homework = await db.Homework.findByPk(id);
    return homework ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAll = async ({
  teacherId,
  sortParameter = null,
  sortOrder = null,
  limit = null,
} = {}) => {
  try {
    const homework = await db.Assignment.findAll({
      attributes: ["id", "createdAt", "updatedAt"],
      include: [
        {
          model: db.Homework,
          attributes: [
            "id",
            "homeworkName",
            "homeworkContent",
            "homeworkStartDate",
            "homeworkEndDate",
            "homeworkShowResult",
            "homeworkMustLogin",
            "teacherId",
            "createdAt",
          ],
        },
        {
          model: db.Class,
          attributes: [
            "id",
            "className",
            "classYear",
            "teacherId",
            "classGroupId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
      order: [[sortParameter, sortOrder]],
      limit: limit,
    });
    return homework;
  } catch (error) {
    throw error;
  }
};

const getConfigById = async (homeworkId) => {
  try {
    const homework = db.Homework.findByPk(homeworkId, {});

    return homework;
  } catch (error) {
    console.log("Error HomeworkService.getDetailById: ", error);
  }
};

const getAllByClassId = async (classId) => {
  try {
    const homeworks = await db.Assignment.findAll({
      attributes: {
        include: [
          [
            db.sequelize.literal(`(
                  SELECT COUNT(DISTINCT homeworkResults.studentId)
                  FROM  HomeworkResults AS homeworkResults
                  WHERE homeworkResults.homeworkId = Homework.id
                )`),
            "totalSubmit",
          ],
        ],
      },
      where: {
        classId: classId,
      },
      include: [
        {
          model: db.Homework,
          attributes: [
            "id",
            "homeworkName",
            "homeworkContent",
            "homeworkStartDate",
            "homeworkEndDate",
            "homeworkShowResult",
            "homeworkMustLogin",
            "teacherId",
            "createdAt",
          ],
          include: [
            {
              model: db.HomeworkResult,
              attributes: [],
            },
          ],
        },
      ],
    });

    return homeworks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentsHomework = async ({ homeworkId, classId } = {}) => {
  try {
    console.log(homeworkId, classId);
    const homework = await db.Assignment.findByPk(homeworkId, {
      attributes: ["id", "createdAt", "updatedAt"],
      include: [
        {
          model: db.Homework,
          attributes: [
            "id",
            "homeworkName",
            "homeworkContent",
            "homeworkStartDate",
            "homeworkEndDate",
            "homeworkShowResult",
            "homeworkMustLogin",
            "teacherId",
            "createdAt",
          ],
          include: {
            model: db.HomeworkFile,
            attributes: ["id", "hwfileName", "hwfileLink"],
          },
        },
        {
          model: db.Class,
          attributes: [
            "id",
            "className",
            "classYear",
            "teacherId",
            "classGroupId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    const classroom = await db.Class.findByPk(classId, {
      attributes: ["id", "className", "classYear", "teacherId", "classGroupId"],
      through: { attributes: [] },
    });

    const students = await studentService.getResultsByClassId(classId);

    const data = {
      homeworkObj: homework,
      classObj: classroom,
      studentObj: students,
    };

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getClassWithHomework = async ({ teacherId }) => {
  try {
    const classwithHomework = await db.Class.findAll({
      attributes: [
        "id",
        "className",
        "classYear",
        "teacherId",
        "classGroupId",
        "createdAt",
        "updatedAt",
      ],
      where: {
        teacherId: teacherId,
      },
      include: [
        {
          model: db.Assignment,
          attributes: ["id", "createdAt", "updatedAt"],
          include: [
            {
              model: db.Homework,
              attributes: [
                "id",
                "homeworkName",
                "homeworkContent",
                "homeworkStartDate",
                "homeworkEndDate",
                "homeworkShowResult",
                "homeworkMustLogin",
                "teacherId",
                "createdAt",
              ],
            },
            {
              model: db.Class,
              attributes: [
                "id",
                "className",
                "classYear",
                "teacherId",
                "classGroupId",
                "createdAt",
                "updatedAt",
              ],
            },
          ],
        },
      ],
    });
    return classwithHomework;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getHomeworkWithoutClass = async ({ teacherId } = {}) => {
  try {
    const homeworkGroupByClass = await db.Class.findByPk(-2, {
      attributes: [
        "id",
        "className",
        "classYear",
        "teacherId",
        "classGroupId",
        "createdAt",
        "updatedAt",
      ],
      where: {
        teacherId: teacherId,
      },
      include: [
        {
          model: db.Homework,
          attributes: [
            "id",
            "homeworkContent",
            "homeworkStartDate",
            "homeworkEndDate",
            "homeworkShowResult",
            "homeworkMustLogin",
            "teacherId",
          ],
        },
      ],
    });
    return homeworkGroupByClass;
  } catch (error) {
    throw error;
  }
};

const getConfig = async (homeworkId) => {
  try {
    console.log(homeworkId);
    const homework = await db.Homework.findByPk(homeworkId, {
      attributes: [
        "id",
        "homeworkName",
        "homeworkContent",
        "homeworkStartDate",
        "homeworkEndDate",
        "homeworkShowResult",
        "homeworkMustLogin",
        "teacherId",
        "createdAt",
      ],
    });

    const classrooms = await db.Class.findAll({
      attributes: ["id", "className", "classYear", "teacherId", "classGroupId"],
      include: [
        {
          model: db.Assignment,
          // attributes: ["id", "hashId"],
          where: {
            homeworkId: homeworkId,
          },
          require,
        },
      ],
    });

    const data = {
      homeworkObj: homework,
      classObjs: classrooms,
    };

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

// const getClass

const updateConfig = async ({
  homeworkId,
  homeworkName,
  homeworkStartDate,
  homeworkEndDate,
  homeworkContent,
  homeworkMustLogin,
  homeworkShowResult,
}) => {
  try {
    const updatedHomeworkConfig = await db.Homework.update(
      {
        homeworkName,
        homeworkStartDate,
        homeworkEndDate,
        homeworkContent,
        homeworkMustLogin,
        homeworkShowResult,
      },
      { where: { id: homeworkId } }
    );
    return updatedHomeworkConfig;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const updateContent = async ({ homeworkId, homeworkContent }) => {
  try {
    const updatedHomeworkConfig = await db.Homework.update(
      {
        homeworkContent,
      },
      { where: { id: homeworkId } }
    );
    return updatedHomeworkConfig;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const updateFile = async ({ homeworkId, homeworkContent }) => {
  try {
    const updatedHomeworkConfig = await db.Homework.update(
      {
        homeworkContent,
      },
      { where: { id: homeworkId } }
    );
    return updatedHomeworkConfig;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const create = async ({
  homeworkName,
  homeworkContent,
  homeworkStartDate,
  homeworkEndDate,
  homeworkShowResult,
  homeworkMustLogin,
  teacherId,
}) => {
  try {
    return await db.Homework.create({
      homeworkName,
      homeworkContent,
      homeworkStartDate,
      homeworkEndDate,
      homeworkShowResult,
      homeworkMustLogin,
      teacherId,
    });
  } catch (error) {
    throw error;
  }
};

const trash = async (homeworkId) => {
  try {
    const trashedHomework = await db.Homework.update(
      {
        isInTrash: false,
      },
      {
        where: {
          id: homeworkId,
        },
      }
    );

    return trashedHomework;
  } catch (error) {
    console.log("Error in homeworkService.deleteHomework: ", error);
    throw error;
  }
};

export default {
  isExist,
  getAll,
  getConfigById,
  getAllByClassId,
  getStudentsHomework,
  getClassWithHomework,
  getHomeworkWithoutClass,
  getConfig,
  updateConfig,
  updateContent,
  updateFile,
  create,
  trash,
};
