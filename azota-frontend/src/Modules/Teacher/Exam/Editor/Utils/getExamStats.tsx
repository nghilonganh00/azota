function getExamStats(examJSON: any) {
  let totalMultiChoice = 0;
  let totalUnanswered = 0;
  let multiChoiceList: string[] = [];
  let unansweredList: string[] = [];

  if (!examJSON || typeof examJSON !== "object") {
    return {
      totalMultiChoice,
      totalUnanswered,
      multiChoiceList,
      unansweredList,
    };
  }

  Object.entries(examJSON).forEach(([partKey, part]: [string, any]) => {
    if (part && part.questions) {
      Object.entries(part.questions).forEach(([questionKey, question]: [string, any]) => {
        // Multi-choice: type === "multi-choice"
        if (Object.keys(question.options).length > 0) {
          totalMultiChoice += 1;
          multiChoiceList.push(`${questionKey} (${partKey})`);
        }
        // Unanswered: no answer or answer is empty/undefined/null
        if (
          !("answer" in question) ||
          question.answer === undefined ||
          question.answer === null ||
          (typeof question.answer === "string" && question.answer.trim() === "") ||
          (Array.isArray(question.answer) && question.answer.length === 0)
        ) {
          totalUnanswered += 1;
          unansweredList.push(`${questionKey} (${partKey})`);
        }
      });
    }
  });

  return {
    totalMultiChoice,
    totalUnanswered,
    multiChoiceList,
    unansweredList,
  };
}

export default getExamStats;
