const StringUtil = {
  splitTextByDelimiter: (
    text: string,
    regex: RegExp,
  ): [RegExpMatchArray[], string[]] => {
    const partMatches = Array.from(text.matchAll(regex));
    const positions = partMatches.map((match) => match.index ?? 0);

    positions.push(text.length);

    const parts: string[] = [];
    for (let i = 0; i < positions.length - 1; i++) {
      parts.push(text.slice(positions[i], positions[i + 1]).trim());
    }

    return [partMatches, parts];
  },
};

export default StringUtil;