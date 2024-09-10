import { Redis } from "ioredis";
import classgroupService from "../classgroup/classgroup.service";
import examByClassService from "../examByClass/examByClass.service";
import ExamByStudentService from "../examByStudent/examByStudent.service";
import optionService from "../option/option.service";
import questionService from "../question/question.service";
import questionPartService from "../questionPart/questionPart.service";
import userService from "../user/user.service";
import examService from "./exam.service";
import redisMethod from "../redis/redis.method";

const examController = {
  handleGetDetailByHashId: async (req, res) => {
    try {
      const hashId = req.params.hashId;
      const examObj = await examService.getConfigByHashId(hashId);
      const examId = examObj.id;
      const assignedClassObjs = await examByClassService.getAllByExamId(examId);
      const assignedStudentObjs = await ExamByStudentService.getAllByExamId(
        examId
      );
      // const resultList = await e

      return res.status(201).json({
        data: {
          examObj,
          assignedClassObjs,
          assignedStudentObjs,
        },
        message: `Get the exam with hashId: ${hashId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleGetAllPreviews: async (req, res) => {
    try {
      const teacherId = req.user.id;

      const exam = await examService.getAllPreviews(teacherId);

      return res.status(201).json({
        data: exam,
        message: `Get all the exam successfully`,
      });
    } catch (error) {
      console.log("handleGetAllPreviews in ExamControler has error: ", error);
      return res.status(500).json({
        message: `Internal Server Error`,
        data: {},
      });
    }
  },
  handleConfigByHashId: async (req, res) => {
    try {
      const hashId = req.params.hashId;
      const examObj = await examService.getConfigByHashId(hashId);
      const examId = examObj.id;
      const assignedClassObjs = await examByClassService.getAllByExamId(examId);
      const assignedStudentObjs = await ExamByStudentService.getAllByExamId(
        examId
      );
      const authorObj = await userService.getDetailById(examObj.teacherId);
      const classGroupObjs = await classgroupService.getAllAssignedExam(examId);

      return res.status(201).json({
        data: {
          examObj,
          assignedClassObjs,
          assignedStudentObjs,
          authorObj,
          classGroupObjs,
        },
        message: `Get the exam with hashId: ${hashId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleGetByHashId: async (req, res) => {
    try {
      const hashId = req.params.hashId;

      const exam = await examService.getByHashId(hashId);
      const examObj = exam.toJSON();

      const redis = new Redis();
      await redis.set(`exam:${hashId}`, JSON.stringify(examObj), "EX", 3600);
      console.log("redis: ", dataRedis);

      return res.status(201).json({
        data: examObj,
        message: `Get the exam with hashId: ${hashId} successfully`,
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
      const {
        examName,
        examAssignType,
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        examContent,
      } = req.body;

      const newExam = await examService.create({
        examName,
        examAssignType,
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        teacherId: req.user.id,
      });

      const examId = newExam.id;

      await Promise.all(
        Object.keys(examContent).map(async (partName) => {
          const { title, questions } = examContent[partName];

          const newPart = await questionPartService.create({
            questionPartName: partName,
            examId,
          });

          const partId = newPart.id;

          Object.keys(questions).map(async (questionKey) => {
            const { type, topic, options, method, explain } =
              questions[questionKey];

            const newQuestion = await questionService.create({
              topic,
              type,
              examId,
              examExplain: explain,
              examMethod: method,
              questionPartId: partId,
            });

            const questionId = newQuestion.id;
            Object.keys(options).map(async (optionKey) => {
              const { content, isAnswer } = options[optionKey];
              console.log("option content: ", content);
              const newOption = await optionService.create({
                optionContent: content,
                isAnswer,
                questionId,
              });
            });
          });
        })
      );

      return res.status(201).json({
        data: newExam,
        message: "Create the new exam successfully",
      });
    } catch (error) {
      console.error("Error in ExamController.handleCreate: ", error);
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleUpdateConfig: async (req, res) => {
    try {
      const hashId = req.params.hashId;
      const {
        examName,
        examAssignType,
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        examContent,
      } = req.body;

      const exam = await examService.updateConfigByHashId({
        hashId,
        examName,
        examAssignType,
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        examContent,
      });

      redisMethod.delete(hashId);

      return res.status(200).json({
        data: exam,
        message: `Updated the exam with hashId: ${hashId} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
};

export default examController;
