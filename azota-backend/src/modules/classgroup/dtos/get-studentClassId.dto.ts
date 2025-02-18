import { Classroom as IClassroom } from "src/modules/classroom/classroom.entity";
import { Classgroup } from "../classgroup.entity";

class StudentClass {
  id: number;
}

class Classroom extends IClassroom {
  studentClassess: StudentClass[];
}

export class GetStudentClassIdDto extends Classgroup {
  classrooms: Classroom[];
}
