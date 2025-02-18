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

export interface ExamContentDto extends Record<string, Part> {}
