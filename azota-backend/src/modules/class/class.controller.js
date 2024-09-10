import classService from "./class.service";

const handleGetAll = async (req, res) => {
  try {
    const teacherId = req.user.teacherId;
    const classes = await classService.getAllByTeacher(teacherId);

    return res.status(200).json({
      data: classes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval Server Error",
    });
  }
};

const handelCreate = async (req, res) => {
  const { className, classYear, classGroupId } = req.body;
  const teacherId = req.user.id;

  const newClass = await classService.create({
    className,
    classYear,
    teacherId,
    classGroupId,
  });

  return res.status(200).json({
    data: newClass,
  });
};

export default { handleGetAll, handelCreate };
