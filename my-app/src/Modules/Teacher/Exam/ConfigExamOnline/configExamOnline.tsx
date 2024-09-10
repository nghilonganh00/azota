import { useEffect } from "react";

import Actions from "./Layouts/actions";
import ConfigType from "./Layouts/configType";
import ConfigGeneral from "./Layouts/configGeneral";
import ConfigFee from "./Layouts/configFee";
import ConfigMixed from "./Layouts/configMixed";
import ExamAPI from "../../../../API/examAPI";
import { useParams } from "react-router";
import { useState } from "react";
import {
  Class,
  ExamByClass,
  ExamConfig,
} from "../../../../Globals/Interfaces/interface";
import ConfigOther from "./Layouts/configOther";
import ConfigSecurity from "./Layouts/configSecurity";
import ConfigAnswerAndQuestion from "./Layouts/configAnswerAndQuestion";

const ConfigExamOnline = () => {
  const { hashId } = useParams();

  const [examConfig, setExamConfig] = useState<ExamConfig>({} as ExamConfig);
  const [assignedClasses, setAssignedClasses] = useState<number[]>([]);

  const handleChangeConfig = (
    name: string,
    newValue: string | number[] | string[],
  ) => {
    setExamConfig((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handlePublish = async () => {
    const response = await ExamAPI.updatedConfigByHashId(examConfig);
    console.log("response: ", response);
  };

  useEffect(() => {
    if (hashId) {
      const fetchExamData = async () => {
        const data = await ExamAPI.getConfigByHashId(hashId);
        setExamConfig(data.examObj);
        setAssignedClasses(
          data.assignedClassObjs.map(
            (assignedClass: ExamByClass) => assignedClass.classId,
          ),
        );
      };

      fetchExamData();
    }
  }, []);

  console.log("assigned class obj: ", assignedClasses);

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
            assignedClasses={assignedClasses}
            setAssignedClasses={setAssignedClasses}
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
