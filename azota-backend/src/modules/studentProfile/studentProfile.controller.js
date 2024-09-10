import classroomService from "../classroom/classroom.service";
import studentService from "../student/student.service";

const studentProfileController = {
  handleGet: async (req, res) => {
    const classId = req.params.classId;
    const classroomObj = await classroomService.getById(classId);
    const studentObjs = await studentService.getAll({ classId });

    return res.status(200).json({
      data: {
        classroomObj,
        studentObjs,
      },
      message: "Successfully",
    });
  },
};

export default studentProfileController;
