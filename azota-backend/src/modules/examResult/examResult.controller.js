import sequelizeUtil from "../../utils/sequelizeUtil";
import examService from "../exam/exam.service";
import studentService from "../student/student.service";
import userService from "../user/user.service";
import examResultMethod from "./examResult.method";
import examResultService from "./examResult.service";

const examResultController = {
  handleGetMark: async (req, res) => {
    try {
      const { examResultId } = req.params;

      const examResult = await examResultService.getAnswersById(examResultId);
      const examResultObj = examResult.toJSON();

      const exam = await examService.getById(examResultObj.examId);
      const examObj = exam.toJSON();

      const { rightAnswer, questionTotal, mark, correctQuestionIds } =
        await examResultMethod.markExam(examResultId);

      examResultObj["rightAnswer"] = rightAnswer;
      examResultObj["questionTotal"] = questionTotal;
      examResultObj["mark"] = mark;

      const historyExamResultObjs = await examResultService.getHistory(
        examResultObj.examId,
        examResult.studentId
      );

      const student = await studentService.getConfigById(examResult.studentId);
      const markedBy = await userService.getDetailById(exam.teacherId);

      return res.status(201).json({
        data: {
          examObj: examObj,
          examResult: examResultObj,
          studentObj: student,
        },
        message: `Get the mark with examResultId: ${examResultId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleGetReview: async (req, res) => {
    try {
      const { examResultId } = req.params;

      const examResult = await examResultService.getAnswersById(examResultId);
      const examResultObj = examResult.toJSON();

      const exam = await examService.getById(examResultObj.examId);
      const examObj = exam.toJSON();

      const { rightAnswer, questionTotal, mark, correctQuestionIds } =
        await examResultMethod.markExam(examResultId);

      examResultObj["rightAnswer"] = rightAnswer;
      examResultObj["questionTotal"] = questionTotal;
      examResultObj["mark"] = mark;

      const historyExamResultObjs = await examResultService.getHistory(
        examResultObj.examId,
        examResult.studentId
      );

      const student = await studentService.getConfigById(examResult.studentId);
      const markedBy = await userService.getDetailById(exam.teacherId);

      return res.status(201).json({
        data: {
          examObj: examObj,
          examResult: examResultObj,
          historyExamResultObjs: historyExamResultObjs,
          questionObjs: [],
          correctQuestionIds: correctQuestionIds,
          studentObj: student,
          markedByObj: markedBy,
        },
        message: `Get the exam with examId: ${examResultId} successfully`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleGetAnswer: async (req, res) => {
    try {
      const { examResultId } = req.params;

      const examResult = await examResultService.getAnswersById(examResultId);
      const examResultObj = examResult.toJSON();

      const exam = await examService.getById(examResultObj.examId);
      const examObj = exam.toJSON();

      const { rightAnswer, questionTotal, mark, correctQuestionIds } =
        await examResultMethod.markExam(examResultId);

      examResultObj["rightAnswer"] = rightAnswer;
      examResultObj["questionTotal"] = questionTotal;
      examResultObj["mark"] = mark;

      const historyExamResultObjs = await examResultService.getHistory(
        examResultObj.examId,
        examResult.studentId
      );

      const student = await studentService.getConfigById(examResult.studentId);
      const markedBy = await userService.getDetailById(exam.teacherId);

      return res.status(201).json({
        data: {
          examObj: examObj,
          examResult: examResultObj,
          // historyExamResultObjs: historyExamResultObjs,
          // questionObjs: [],
          correctQuestionIds: correctQuestionIds,
          // studentObj: student,
          // markedByObj: markedBy,
        },
        message: `Get the exam with examId: ${examResultId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleGetLatestByExamId: async (req, res) => {
    try {
      const { examId } = req.params;

      const data = await examResultService.getLatestStudentResultByExamId(
        examId
      );

      return res.status(200).json({
        data: { examResults: data },
        message: `Get the latest exam results with examId: ${examId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  getAssignedByClassLatest: async (req, res) => {
    try {
      const { examId, classId } = req.params;

      const data = await examResultService.getAssignedByClassLatest(
        examId,
        classId
      );

      return res.status(200).json({
        data: data,
        message: `Get the latest exam results with examId: ${examId} assigned by class ${classId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleCreate: async (req, res) => {
    try {
      const { examId, examresAnswer, examresStarted } = req.body;
      const userId = req.user.id;
      const newExamResult = await examResultService.create({
        examId,
        studentId: userId,
        examresAnswers: examresAnswer,
        examresStarted,
      });

      return res.status(201).json({
        data: newExamResult,
        message: "Create the new exam result successfully",
      });
    } catch (error) {
      console.error("Error creating exam result:", error);
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
};

export default examResultController;
