import { ClassGroup } from "./interface";

const calculateScore = (correctAnswer: number, questionTotal: number) => {
  if (questionTotal === 0) return 0;
  const score = (correctAnswer / questionTotal) * 10;
  return parseFloat(score.toFixed(1));
};

export { calculateScore };
