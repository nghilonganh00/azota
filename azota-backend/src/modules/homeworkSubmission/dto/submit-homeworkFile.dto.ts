import { HomeworkSubmissionFile } from "src/modules/homeworkSubmissionFile/homeworkSubmissionFile.entity";

export class SubmitReqDto {
  homeworkSubmissionId: number;
  files: HomeworkSubmissionFile[];
}
