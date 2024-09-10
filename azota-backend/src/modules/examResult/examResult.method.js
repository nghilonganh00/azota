import { sequelize } from "../../models";
import sequelizeUtil from "../../utils/sequelizeUtil";
import examService from "../exam/exam.service";
import examResultService from "./examResult.service";

const examResultMethod = {
  markExam: async (examResultId) => {
    try {
      const examResult = await examResultService.getAnswersById(examResultId);
      const examResultObj = sequelizeUtil.convertObj(examResult);
      console.log("examResultObj: ", examResultObj);

      const exam = await examService.getById(examResultObj.examId);
      const examObj = sequelizeUtil.convertObj(exam);

      let examresAnswers = examResultObj.examresAnswers;
      examresAnswers = examresAnswers.replace(/\\/g, "");

      // Now parse the JSON string
      const examresAnswersObj = JSON.parse(examresAnswers);

      let rightAnswer = 0;
      const questionTotal = examObj.Questions.length;
      let mark = 0.0;
      let correctQuestionIds = [];

      examObj.Questions.forEach((question) => {
        const { scorePerQuestion, Options } = question;

        const examresAnswer = examresAnswersObj.find(
          (examres) => examres.QuestionId === question.id
        );

        if (examresAnswer) {
          const { Answered, QuestionId, AnswerContent } = examresAnswer;
          if (Answered) {
            AnswerContent.forEach((answer) => {
              const option = Options.find(
                (option) => option.key === answer.Content
              );
              console.log("option: ", option);

              if (option && option.isAnswer) {
                rightAnswer += 1;
                mark += scorePerQuestion;
                correctQuestionIds.push(QuestionId);
              }
            });
          }
          console.log("question: ", question);
          console.log("examresAnswer: ", examresAnswer);
          console.log("rightAnswer: ", rightAnswer);
          console.log("mark: ", mark);
        }
      });

      return { rightAnswer, questionTotal, mark, correctQuestionIds };
    } catch (error) {
      throw new Error(`Error in examResultService.getMark: ${error}`);
    }
  },
};

export default examResultMethod;
