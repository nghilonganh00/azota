import { useEffect, useState } from "react";
import { ExamConfig } from "../../../../../Globals/Interfaces/interface";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";
import ClassGroupAPI from "../../../../../API/classGroupAPI";
import AssignClassPanel from "./assignClassPanel";
import AssignAllPanel from "./assignAllPanel";
import AssignStudentPanel from "./assignStudentPanel";

interface AssignTabsProp {
  examConfig: ExamConfig;
  setExamConfig: React.Dispatch<React.SetStateAction<ExamConfig>>;
  assignedClasses: number[];
  setAssignedClasses: React.Dispatch<React.SetStateAction<number[]>>;
  handleChangeConfig: (name: string, newValue: string | number[]) => void;
}

const ASSIGN_OPTIONS = [
  { id: "assign-all", value: "ALL", label: "Tất cả mọi người" },
  { id: "assign-class", value: "CLASS", label: "Giao theo lớp" },
  { id: "assign-student", value: "STUDENT", label: "Giao theo học sinh" },
];

const AssignTabs: React.FC<AssignTabsProp> = (props) => {
  const {
    examConfig,
    setExamConfig,
    assignedClasses,
    setAssignedClasses,
    handleChangeConfig,
  } = props;

  const { examAssignType } = examConfig;
  console.log("exam assign type: ", examAssignType);
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [classGroupWithStudent, setClassGroupWithStudent] = useState([]);

  const handleAssignClass = (assignClass: number) => {
    setAssignedClasses((preValue) =>
      preValue.includes(assignClass)
        ? preValue.filter((e) => e !== assignClass)
        : [...preValue, assignClass],
    );
  };

  useEffect(() => {
    const fetchClassGroupData = async () => {
      const data = await ClassGroupAPI.getAll();
      setClassGroups(data);
    };

    const fetchListStudentData = async () => {
      const data = await ClassGroupAPI.getAllWithStudent();
      setClassGroupWithStudent(data);
    };

    fetchClassGroupData();
    fetchListStudentData();
  }, []);

  console.log("list student: ", classGroupWithStudent);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-5">
        <div className="text-sm font-medium">Ai được phép làm</div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div className="flex items-center justify-between">
          {ASSIGN_OPTIONS.map((option, key) => (
            <div className="flex items-center gap-2" key={key}>
              <input
                type="radio"
                id={option.id}
                name="who-allow"
                value={option.value}
                onChange={(e) =>
                  handleChangeConfig("examAssignType", e.target.value)
                }
                defaultChecked={examAssignType === option.value}
                className="size-4"
              />
              <label className="text-sm" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12">
        {examAssignType === "ALL" && <AssignAllPanel />}

        {examAssignType === "CLASS" && (
          <AssignClassPanel
            assignedClasses={assignedClasses}
            onChange={handleAssignClass}
            classGroups={classGroups}
          />
        )}

        {examAssignType === "STUDENT" && (
          <AssignStudentPanel
            assignedStudent={assignedClasses}
            onChange={handleAssignClass}
            classGroupWithStudent={classGroupWithStudent}
          />
        )}
      </div>
    </div>
  );
};

export default AssignTabs;
