import { Injectable } from "@nestjs/common";
import { ExamResult } from "./examResult.entity";
import { Exam } from "../exam/exam.entity";
import { ExamResultAnswerDto } from "./dtos/examResultAnswer.dto";

@Injectable()
export class ExamResultUtilService {
  constructor() {}

  calculateScore(examResult: ExamResult, exam: Exam) {
    const answerExamResult = JSON.parse(examResult.answer);

    const questions = exam.questionParts.reduce((acc, questionPart) => {
      questionPart.questions.forEach((question) => {
        const correctOptionIds = question.options.filter((option) => option.isCorrect).map((option) => option.id);

        acc[question.id] = {
          ...question,
          correctOptionIds,
        };
      });
      return acc;
    }, {});
    let score = 0;
    const questionTotal = Object.keys(questions).length;

    const correctQuestionIds = [];

    Object.values(answerExamResult).forEach((answer: ExamResultAnswerDto) => {
      const { Answered, QuestionId, AnswerContent } = answer;

      if (!Answered) return;

      const { scorePerQuestion, correctOptionIds } = questions[QuestionId];
      const isCorrect = AnswerContent.every((answerContent) => correctOptionIds?.includes(answerContent.Index));

      if (isCorrect) {
        score += scorePerQuestion;
        correctQuestionIds.push(QuestionId);
      }
    });

    return { score, correctQuestionIds, questionTotal };
  }
}
