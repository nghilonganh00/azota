import ExamByStudentService from "./examByStudent.service";

const ExamByStudentController = {
  // Lấy danh sách ID của các sinh viên được giao 1 bài kiểm tra cụ thể
  getAssignedExamStudentIds: async (req, res) => {
    try {
      const { examId } = req.params;

      const studentIds = await ExamByStudentService.getAssignedExamStudentIds(
        examId
      );

      return res.status(200).json({
        data: studentIds,
        message: `Get the list of studentId assigned by exam ${examId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        data: [],
        message: `Internal Server Error: ${error}`,
      });
    }
  },
};

export default ExamByStudentController;
