import StringUtil from "../../../../../Utils/string";

const convertToJSON = (text: string) => {
  const exam: { [key: string]: any } = {};

  // Define regex patterns
  const partRegex = /Phần \d+\./g;
  const questionRegex = /Câu \d+\.?/g;
  const optionKeys = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // Split the text by parts
  const [partMatches, parts] = StringUtil.splitTextByDelimiter(text, partRegex);

  parts.forEach((part, index) => {
    const partKey: string = partMatches[index][0];
    exam[partKey] = {};

    // Extract part title
    const newlineIndex = part.indexOf("\n");
    const partTitle = part.slice(0, newlineIndex).trim();
    exam[partKey]["title"] = partTitle;

    // Split the part into questions
    const [questionMatches, questions] = StringUtil.splitTextByDelimiter(
      part,
      questionRegex,
    );

    exam[partKey]["questions"] = {};

    questions.forEach((question, index) => {
      const questionKey = questionMatches[index][0];
      const match = questionKey.match(/\d+/);
      const rawIndex = match ? match[0] : null;

      exam[partKey]["questions"][questionKey] = {};

      // Extract topic
      const topicMatches = Array.from(question.matchAll(questionRegex));
      const topicStartIndex = topicMatches[0][0].length;
      const topicEndIndex = question.indexOf("\n", topicStartIndex);
      const topic =
        topicEndIndex === -1
          ? question.substring(topicStartIndex)
          : question.substring(topicStartIndex, topicEndIndex);

      exam[partKey]["questions"][questionKey]["topic"] = topic.trim();

      // Extract options
      exam[partKey]["questions"][questionKey]["type"] = "ESSAY"; //Default type
      exam[partKey]["questions"][questionKey]["options"] = {};
      exam[partKey]["questions"][questionKey]["rawIndex"] = rawIndex;

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
            const option = question
              .substring(optionStartIndex, optionEndIndex)
              .trim();
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
