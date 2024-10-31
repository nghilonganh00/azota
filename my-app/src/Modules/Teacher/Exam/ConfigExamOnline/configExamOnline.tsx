import { useEffect } from "react";

import Actions from "./Layouts/actions";
import ConfigType from "./Layouts/configType";
import ConfigGeneral from "./Layouts/configGeneral";
import ConfigFee from "./Layouts/configFee";
import ConfigMixed from "./Layouts/configMixed";
import ExamAPI from "../../../../API/examAPI";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  ExamByClass,
  ExamByStudent,
  ExamConfig,
} from "../../../../Globals/Interfaces/interface";
import ConfigOther from "./Layouts/configOther";
import ConfigSecurity from "./Layouts/configSecurity";
import ConfigAnswerAndQuestion from "./Layouts/configAnswerAndQuestion";

const ConfigExamOnline = () => {
  const navigate = useNavigate();
  const { hashId } = useParams();

  const [examConfig, setExamConfig] = useState<ExamConfig>({} as ExamConfig);
  const [assignedClassIds, setAssignedClassIds] = useState<number[]>([]);
  const [assignedStudentIds, setAssignedStudentIds] = useState<number[]>([]);

  const handleChangeConfig = (
    name: string,
    newValue: string | number[] | string[],
  ) => {
    setExamConfig((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handlePublish = async () => {
    console.log("examConfig: ", examConfig);

    const response: any = await ExamAPI.updatedConfigByHashId({
      ...examConfig,
      assignedStudentIds,
      assignedClassIds,
    });

    if (response.ok) {
      const responseObj = await response.json();
      const updatedExam: ExamConfig = responseObj.data;
      navigate(`/teacher/exam/publish-exam/${updatedExam.hashId}`);
    }
  };

  const fetchExamData = async () => {
    if (hashId) {
      const data = await ExamAPI.getConfigByHashId(hashId);
      setExamConfig(data.examObj);
      setAssignedClassIds(data.assignedClassIds);
      setAssignedStudentIds(() =>
        data.assignedStudentObjs.map(
          (student: ExamByStudent) => student.studentId,
        ),
      );
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);

  return (
    <div className="w-full px-5">
      {Object.keys(examConfig).length !== 0 && (
        <div className="mx-auto max-w-[1150px] space-y-6 text-sm">
          <div className="mb-6 text-center font-semibold text-gray-800">
            Tên đề thi: test - Mã đề: 8xjt9m
          </div>
          <ConfigType
            examConfig={examConfig}
            setExamConfig={setExamConfig}
            handleChangeConfig={handleChangeConfig}
          />
          <ConfigGeneral
            examConfig={examConfig}
            setExamConfig={setExamConfig}
            assignedClasses={assignedClassIds}
            setAssignedClasses={setAssignedClassIds}
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

          <ConfigMixed
            examConfig={examConfig}
            setExamConfig={setExamConfig}
            handleChangeConfig={handleChangeConfig}
          />

          {examConfig.examType === "TEST" && (
            <ConfigAnswerAndQuestion
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}

          <ConfigFee
            examConfig={examConfig}
            setExamConfig={setExamConfig}
            handleChangeConfig={handleChangeConfig}
          />

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
