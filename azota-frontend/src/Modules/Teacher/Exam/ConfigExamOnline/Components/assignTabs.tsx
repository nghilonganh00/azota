import { useEffect, useState } from "react";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";
import ClassGroupAPI from "../../../../../API/classGroupAPI";
import AssignClassPanel from "./assignClassPanel";
import AssignAllPanel from "./assignAllPanel";
import AssignStudentPanel from "./assignStudentPanel";
import { Classgroup } from "../../../../../Globals/Interfaces/info.interface";

interface AssignTabsProp {
  examConfig: Exam;
  assignedclassrooms: number[];
  setAssignedclassrooms: React.Dispatch<React.SetStateAction<number[]>>;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
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
    assignedclassrooms,
    setAssignedclassrooms,
    assignedStudentIds,
    setAssignedStudentIds,
    handleChangeConfig,
  } = props;

  const { assignType } = examConfig;
  const [classGroups, setClassGroups] = useState<Classgroup[]>([]);
  const [classgroups, setClassgroups] = useState<Classgroup[]>([]);

  const handleAssignClass = (assignClass: number) => {
    setAssignedclassrooms((preValue) =>
      preValue.includes(assignClass) ? preValue.filter((e) => e !== assignClass) : [...preValue, assignClass],
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const [classgroupRes, studentClassIdsRes] = await Promise.all([
        ClassGroupAPI.getAll(),
        ClassGroupAPI.getStudentClasseIds(examConfig.id),
      ]);

      if (classgroupRes?.status !== 200 || studentClassIdsRes?.status !== 200) return;

      setClassGroups(classgroupRes.data);
      setClassgroups(studentClassIdsRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-5">
        <div className="text-sm font-medium">Ai được phép làm</div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div className="flex items-center justify-between">
          {ASSIGN_OPTIONS.map((option, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                type="radio"
                id={option.id}
                name="who-allow"
                value={option.value}
                onChange={(e) => handleChangeConfig("assignType", e.target.value)}
                defaultChecked={assignType === option.value}
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
        {assignType === "ALL" && <AssignAllPanel />}

        {assignType === "CLASS" && (
          <AssignClassPanel
            assignedclassrooms={assignedclassrooms}
            onChange={handleAssignClass}
            classGroups={classgroups}
          />
        )}

        {assignType === "STUDENT" && (
          <AssignStudentPanel
            classgroups={classgroups}
            assignedStudentIds={assignedStudentIds}
            setAssignedStudentIds={setAssignedStudentIds}
          />
        )}
      </div>
    </div>
  );
};

export default AssignTabs;
