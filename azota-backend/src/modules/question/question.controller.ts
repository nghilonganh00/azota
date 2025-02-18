import { Controller, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { QuestionService } from "./question.service";

@Controller("questions")
export class QuestionController {
  constructor(
    @Inject(REQUEST)
    private readonly request: any,
    private readonly questionService: QuestionService
  ) {}

  
}
