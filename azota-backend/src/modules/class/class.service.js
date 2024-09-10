const db = require("../../models");

const isExist = async (id) => {
  try {
    const classroom = await db.Class.findByPk(id);
    return classroom ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAll = async () => {
  try {
    const classes = await db.Class.findAll();
    return classes;
  } catch (error) {
    throw error;
  }
};

const getAllByTeacher = async (teacherId) => {
  try {
    const classes = await db.Class.findAll({
      where: {
        teacherId: teacherId,
      },
    });

    return classes;
  } catch (error) {
    throw error;
    return [];
  }
};

const create = async ({
  className,
  classYear,
  teacherId = 1,
  classGroupId = -2,
} = {}) => {
  try {
    const newClass = await db.Class.create({
      className,
      classYear,
      teacherId,
      classGroupId,
    });
    return newClass;
  } catch (error) {
    throw error;
  }
};

const edit = async (editClass) => {
  try {
    return await db.Class.update(editClass);
  } catch (error) {
    throw error;
  }
};

const del = async (id) => {
  try {
    return await db.Class.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default { isExist, getAll, getAllByTeacher, create, edit, del };
