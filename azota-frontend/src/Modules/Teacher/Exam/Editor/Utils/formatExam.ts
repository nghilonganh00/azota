import StringUtil from "../../../../../Utils/string";

enum QuestionType {
  MULTIQUE_CHOICE = "MULTIQLE_CHOICE",
  ESSAY = "ESSAY",
}

interface Option {
  content: string;
  isAnswer: boolean;
  key: string;
}

interface Question {
  topic: string;
  type: string;
  rawIndex: number;
  options: Record<string, Option>;
}

interface Part {
  title: string;
  rawIndex: number;
  questions: Record<string, Question>;
}

export interface ExamContent extends Record<string, Part> {}

const convertToJSON = (text: string) => {
  const exam: ExamContent = {};

  // Define regex patterns
  const partRegex = /Phần \d+\./g;
  const questionRegex = /Câu \d+\.?/g;
  const optionKeys = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let partIndex = 0;
  let questionIndex = 0;

  // Split the text by parts
  const [partMatches, parts] = StringUtil.splitTextByDelimiter(text, partRegex);

  parts.forEach((part, index) => {
    partIndex += 1;

    const partKey: string = partMatches[index][0];

    // Extract part title
    const newlineIndex = part.indexOf("\n");
    const partTitle = part.slice(0, newlineIndex).trim();

    exam[partKey] = {
      title: partTitle,
      rawIndex: partIndex,
      questions: {},
    };

    // Split the part into questions
    const [questionMatches, questions] = StringUtil.splitTextByDelimiter(part, questionRegex);

    exam[partKey]["questions"] = {};

    questions.forEach((question, index) => {
      questionIndex += 1;

      const questionKey = questionMatches[index][0];
      const match = questionKey.match(/\d+/);
      const rawIndex = match ? match[0] : null;

      // Extract topic
      const topicMatches = Array.from(question.matchAll(questionRegex));
      const topicStartIndex = topicMatches[0][0].length;
      const topicEndIndex = question.indexOf("\n", topicStartIndex);
      const topic =
        topicEndIndex === -1 ? question.substring(topicStartIndex) : question.substring(topicStartIndex, topicEndIndex);

      exam[partKey].questions[questionKey] = {
        topic: topic.trim(),
        type: QuestionType.ESSAY,
        rawIndex: questionIndex,
        options: {},
      };

      optionKeys.forEach((optionKey) => {
        const optionRegex = new RegExp(`\\*?${optionKey}\\.`, "g");
        const optionMatches = Array.from(question.matchAll(optionRegex));
        console.log("optionMatches: ", optionMatches);
        exam[partKey]["questions"][questionKey]["type"] = "MULTIQLE_CHOICE";

        if (optionMatches.length > 0) {
          const matchIndex = optionMatches[0].index!;
          const optionStartIndex = matchIndex + optionMatches[0][0].length;
          const optionEndIndex = question.indexOf(".", optionStartIndex);

          if (optionEndIndex !== -1) {
            const option = question.substring(optionStartIndex, optionEndIndex).trim();
            exam[partKey]["questions"][questionKey]["options"][optionKey] = {
              content: option,
              isAnswer: optionMatches[0][0].startsWith("*"),
              key: optionKey,
            };
          }
        }
      });
    });
  });

  return exam;
};

export default convertToJSON;
