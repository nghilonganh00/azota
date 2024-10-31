import db from "../../models";
import examResultMethod from "../examResult/examResult.method";
import studentService from "./student.service";

const studentController = {
  handleGetAll: async (req, res) => {
    const { classId } = req.body;
    const students = await studentService.getAll({ classId });
    return res.status(200).json({
      data: students,
    });
  },
  handleGetExamResults: async (req, res) => {
    try {
      const { examId, classroomId } = req.query;
      const students = await studentService.getExamResults(examId, classroomId);

      const studentObjs = students.map((student) => student.toJSON());
      for (const studentObj of studentObjs) {
        const ExamResults = studentObj["ExamResults"];
        for (const examResult of ExamResults) {
          const { mark } = await examResultMethod.markExam(examResult.id);
          examResult["mark"] = mark;
        }
      }

      return res.status(200).json({
        data: studentObjs,
        message: "Get the exam results successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        data: [],
        message: `Internal Server Error: ${error}`,
      });
    }
  },
  handleConfirm: async (req, res) => {
    try {
      const { studentId } = req.params;
      const userId = 1;

      const student = await db.Student.findByPk(studentId);
      if (student.userId) {
        return res.status(401).json({
          data: {},
          message: "This student has been identified by another user",
        });
      }

      const confirmedStudent = await studentService.confirm({
        studentId,
        userId,
      });

      return res.status(200).json({
        data: confirmedStudent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: {},
        message: "Interval Server Error",
      });
    }
  },

  //Lấy danh sách sinh viên và trạng thái giao bài kiểm tra trong lớp.
  getExamAssignments: async (req, res) => {
    try {
      const { classId, examId } = req.params;
      const studentAssignments = await studentService.getExamAssignment(
        classId,
        examId
      );

      return res.status(200).json({
        data: studentAssignments,
        message: `Get list of students with exam ${examId} assignment status in class ${classId}`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: [],
        message: `Interval Server Error: ${error}`,
      });
    }
  },

  handleCreate: async (req, res) => {
    try {
      const {
        studentName,
        identificationNumber,
        studentGender,
        studentPhone,
        studentEmail,
        userId,
        classId,
      } = req.body;
      const newStudent = await studentService.create({
        studentName,
        identificationNumber,
        studentGender,
        studentPhone,
        studentEmail,
        userId,
        classId,
      });
      return res.status(201).json({
        data: newStudent,
      });
    } catch (error) {
      return res.status(500).json({
        data: {},
        message: "Internal Server Error",
      });
    }
  },
};

export default studentController;
