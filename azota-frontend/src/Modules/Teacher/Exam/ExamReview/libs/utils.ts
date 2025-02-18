import { GroupedQuestionPart, Question } from "./interface";

export const groupQuestionsByPart = (questions: Question[]): GroupedQuestionPart[] => {
  const groupedQuestionsObj: { [key: number]: GroupedQuestionPart } = {};

  questions.forEach((question) => {
    const { questionPartId, QuestionPart } = question;

    if (!groupedQuestionsObj[questionPartId]) {
      groupedQuestionsObj[questionPartId] = {
        ...QuestionPart,
        questions: [],
      };
    }

    groupedQuestionsObj[questionPartId].questions.push(question);
  });

  const groupedQuestions = Object.values(groupedQuestionsObj);
  groupedQuestions.forEach((group) => {
    group.questions.sort((a, b) => a.rawIndex - b.rawIndex);
  });

  return groupedQuestions;
};
