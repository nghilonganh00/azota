import assignmentService from "../assignment/assignment.service";
import classService from "../class/class.service";
import homeworkFileService from "../homeworkfile/homworkfile.service";
import userService from "../user/user.service";
import homeworkService from "./homework.service";

const handleGetAll = async (req, res) => {
  const { sortParameter, sortOrder, limit } = req.query;
  const homework = await homeworkService.getAll({
    teacherId: 1,
    sortParameter,
    sortOrder,
    limit: parseInt(limit),
  });
  return res.status(200).json({
    data: homework,
  });
};

const handleGetAllByClassId = async (req, res) => {
  try {
    const classId = req.params.classId;

    const homeworks = await homeworkService.getAllByClassId(classId);

    return res.status(200).json({
      data: homeworks,
      message: "Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Serverl Error",
      data: [],
    });
  }
};

const handleGetStudentsHomework = async (req, res) => {
  const { homeworkId, classId } = req.params;
  const homework = await homeworkService.getStudentsHomework({
    homeworkId,
    classId,
  });
  return res.status(200).json({
    data: homework,
  });
};

const handleGetClassWithHomework = async (req, res) => {
  const homework = await homeworkService.getClassWithHomework({
    teacherId: 1,
  });

  return res.status(200).json({
    data: homework,
  });
};

const handleGetConfig = async (req, res) => {
  const { homeworkId } = req.params;
  const homeworkConfig = await homeworkService.getConfig(homeworkId);
  return res.status(200).json({
    data: homeworkConfig,
  });
};

const handleGetAssigment = async (req, res) => {
  try {
    const { homeworkId } = req.params;

    const homeworkObj = await homeworkService.getConfig(homeworkId);
    const assigmentObjs = await homeworkService.getAssigment(homeworkId);

    return res.status(200).json({
      data: {
        homeworkObj,
        assigmentObjs,
      },
      message: `Get successfully the assignments of homework with ID ${homeworkId}`,
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Interval Server Error",
    });
  }
};

const handleUpdateConfig = async (req, res) => {
  const { homeworkId } = req.params;
  const {
    homeworkName,
    homeworkStartDate,
    homeworkEndDate,
    homeworkContent,
    homeworkMustLogin,
    homeworkShowResult,
    classIds,
  } = req.body;

  const updatedHomeworkConfig = await homeworkService.updateConfig({
    homeworkId,
    homeworkName,
    homeworkStartDate,
    homeworkEndDate,
    homeworkContent,
    homeworkMustLogin,
    homeworkShowResult,
  });

  await assignmentService.deleteAllByHomeworkId(homeworkId);

  await Promise.all(
    classIds.map(async (classId) => {
      const isExistClass = await classService.isExist(classId);

      if (!isExistClass) {
        return res.status(401).json({
          message: "Class is not exist",
          data: {},
        });
      }

      return assignmentService.create({
        classId,
        homeworkId,
      });
    })
  );

  return res.status(200).json({
    data: updatedHomeworkConfig,
  });
};

const handleUpdateContent = async (req, res) => {
  const { homeworkId } = req.params;
  const { homeworkContent } = req.body;

  const updatedHomework = await homeworkService.updateContent({
    homeworkId,
    homeworkContent,
  });

  return res.status(200).json({
    data: updatedHomework,
  });
};

const handleCreate = async (req, res) => {
  const {
    homeworkName,
    homeworkContent,
    homeworkStartDate,
    homeworkEndDate,
    homeworkShowResult,
    homeworkMustLogin,
    homeworkFiles,
    classIds,
  } = req.body;

  console.log("req.body: ", homeworkFiles);

  if (!userService.isTeacher(1)) {
    return res.status(401).json({
      message: "Teacher is not exist",
      data: {},
    });
  }

  //Create the new homework
  const newHomework = await homeworkService.create({
    homeworkName,
    homeworkContent,
    homeworkStartDate,
    homeworkEndDate,
    homeworkShowResult,
    homeworkMustLogin,
    teacherId: "1",
  });
  newHomework["dataValues"]["Assignments"] = [];
  console.log("new homework: ", newHomework);

  const homeworkId = newHomework.id;

  //Create the new homeworkfile
  await Promise.all(
    homeworkFiles.map(async (homeworkFile) => {
      await homeworkFileService.create({
        homeworkId: homeworkId,
        hwfileName: homeworkFile.homeworkFileName,
        hwfileLink: homeworkFile.homeworkFileLink,
      });
    })
  );

  //Assign for classes
  await Promise.all(
    classIds.map(async (classId) => {
      const isExistClass = await classService.isExist(classId);

      if (!isExistClass) {
        return res.status(401).json({
          message: "Class is not exist",
          data: {},
        });
      }

      const assignment = await assignmentService.create({
        classId,
        homeworkId,
      });

      newHomework["dataValues"]["Assignments"].push(assignment);
      return [];
    })
  );

  return res.status(200).json({
    message: "Successfull",
    data: newHomework,
  });
};

const handleTrash = async (req, res) => {
  try {
    const homeworkId = req.params.homeworkId;
    const trashedHomework = await homeworkService.trash(homeworkId);

    return res.status(200).json({
      data: trashedHomework,
      message: "Trash successfully the homework",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Interval Server Error",
    });
  }
};

export default {
  handleGetAll,
  handleGetAllByClassId,
  handleGetStudentsHomework,
  handleGetConfig,
  handleUpdateConfig,
  handleUpdateContent,
  handleCreate,
  handleGetClassWithHomework,
  handleTrash,
};
