import assignmentService from "../assignment/assignment.service";
import classroomService from "../classroom/classroom.service";
import studentService from "../student/student.service";

const FrontHomeworkController = {
  handleGetByHashId: async (req, res) => {
    try {
      const { hashId } = req.query;
      const homeworkObj = await assignmentService.getByHashId(hashId);
      const classObj = await classroomService.getByHashId(hashId);
      const studentsObj = await studentService.getResultsByHashId(hashId);

      return res.status(200).json({
        data: {
          homeworkObj: homeworkObj,
          classObj: classObj,
          studentsObj: studentsObj,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Interval Error Server",
      });
    }
  },
};

export default FrontHomeworkController;
