import classgroupService from "./classgroup.service";

const classGroupController = {
  handleGetAll: async (req, res) => {
    const teacherId = req.user.id;
    const classgroups = await classgroupService.getAll({ teacherId });
    const classNotGroup = await classgroupService.getDetail({
      teacherId,
      classGroupId: -2,
    });

    classgroups.push(classNotGroup);

    return res.status(200).json({
      data: classgroups,
    });
  },
  handleCreate: async (req, res) => {
    const { classGroupName } = req.body;
    const teacherId = req.user.id;
    const newClassGroup = await classgroupService.create({
      classGroupName,
      teacherId: teacherId,
    });

    return res.status(200).json({
      data: newClassGroup,
    });
  },
  handleGetAllWithStudent: async (req, res) => {
    const teacherId = req.user.id;
    const classgroups = await classgroupService.getAllWithStudent({
      teacherId,
    });
    const classNotGroup = await classgroupService.getDetailWithStudent({
      teacherId,
      classGroupId: -2,
    });

    classgroups.push(classNotGroup);

    return res.status(200).json({
      data: classgroups,
    });
  },
};

export default classGroupController;
