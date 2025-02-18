import { Controller, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Controller("question-parts")
export class QuestionPartController {
  constructor(
    @Inject(REQUEST)
    private readonly request: any
  ) {}
}
