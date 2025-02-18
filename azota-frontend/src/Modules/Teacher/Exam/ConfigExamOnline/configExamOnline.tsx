import { useEffect } from "react";
import Actions from "./Layouts/actions";
import ConfigType from "./Layouts/configType";
import ConfigGeneral from "./Layouts/configGeneral";
import ConfigFee from "./Layouts/configFee";
import ConfigMixed from "./Layouts/configMixed";
import ExamAPI from "../../../../API/examAPI";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Exam, ExamStudent, ExamClass } from "../../../../Globals/Interfaces/exam.interface";
import ConfigOther from "./Layouts/configOther";
import ConfigSecurity from "./Layouts/configSecurity";
import ConfigAnswerAndQuestion from "./Layouts/configAnswerAndQuestion";

const ConfigExamOnline = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [examConfig, setExamConfig] = useState<Exam>({} as Exam);
  const [assignedClassIds, setAssignedClassIds] = useState<number[]>([]);
  const [assignedStudentIds, setAssignedStudentIds] = useState<number[]>([]);

  const handleChangeConfig = (name: string, newValue: any) => {
    setExamConfig((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handlePublish = async () => {
    if (!examId) return;

    const response: any = await ExamAPI.publish(examId, examConfig, assignedStudentIds, assignedClassIds);

    if (response.ok) {
      const responseObj = await response.json();
      const updatedExam: Exam = responseObj.data;
      navigate(`/teacher/exam/publish-exam/${updatedExam.hashId}`);
    }
  };

  const fetchExamData = async () => {
    if (examId) {
      const response = await ExamAPI.getConfig(examId);
      const data: Exam = response?.data;
      setExamConfig(data);
      setAssignedClassIds(() => data.examClasses.map((examClass: ExamClass) => examClass.classroom.id));
      setAssignedStudentIds(() => data.examStudents?.map((examStudent: ExamStudent) => examStudent.studentClass.id));
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);

  console.log("exam: ", examConfig);
  return (
    <div className="w-full px-5">
      {examConfig && Object.keys(examConfig).length !== 0 && (
        <div className="mx-auto max-w-[1150px] space-y-6 text-sm">
          <div className="mb-6 text-center font-semibold text-gray-800">{`Tên đề thi: ${examConfig.title} - Mã đề: ${examConfig.hashId}`}</div>
          <ConfigType examConfig={examConfig} setExamConfig={setExamConfig} handleChangeConfig={handleChangeConfig} />
          <ConfigGeneral
            examConfig={examConfig}
            assignedclassrooms={assignedClassIds}
            setAssignedclassrooms={setAssignedClassIds}
            assignedStudentIds={assignedStudentIds}
            setAssignedStudentIds={setAssignedStudentIds}
            handleChangeConfig={handleChangeConfig}
          />

          {examConfig.examType === "TEST" && (
            <ConfigSecurity
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}

          <ConfigMixed examConfig={examConfig} setExamConfig={setExamConfig} handleChangeConfig={handleChangeConfig} />

          {examConfig.examType === "TEST" && (
            <ConfigAnswerAndQuestion
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}

          <ConfigFee examConfig={examConfig} setExamConfig={setExamConfig} handleChangeConfig={handleChangeConfig} />

          {examConfig.examType === "TEST" && (
            <ConfigOther
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}
          <Actions handlePublish={handlePublish} />
        </div>
      )}
    </div>
  );
};

export default ConfigExamOnline;
