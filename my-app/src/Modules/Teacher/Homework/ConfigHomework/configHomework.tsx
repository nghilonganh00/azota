import { useEffect, useState } from "react";
import {
  CalendarClock,
  Expand,
  Filter,
  History,
  InfoIcon,
  PanelLeftClose,
  Search,
} from "lucide-react";
import { useParams } from "react-router";
import HomeworkAPI from "../../../../API/homeworkAPI";
import { Homework } from "./interface";
import { Class } from "../../../../Globals/Interfaces/interface";
import ConfigName from "./Layout/configName";
import ConfigTime from "./Layout/configTime";
import ConfigFeature from "./Layout/configFeature";
import ClassGroupAPI from "../../../../API/classGroupAPI";
import { ClassGroup } from "../AddHomework/libs/interfaces";
import ConfigAssignment from "./Layout/configAssignment";

const ConfigHomework = () => {
  const { homeworkId } = useParams();
  const [homeworkConfig, setHomeworkConfig] = useState<Homework>({
    homeworkName: "",
    homeworkContent: "",
    homeworkStartDate: "",
    homeworkEndDate: "",
    homeworkShowResult: "false",
    homeworkMustLogin: "false",
    classIds: [],
  });
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);

  const handleChangeConfig = (name: string, newValue: string | number[]) => {
    setHomeworkConfig((preValues) => ({ ...preValues, [name]: newValue }));
  };

  const handlePublish = async () => {
    if (homeworkId) {
      const updatedHomework = await HomeworkAPI.updateConfig(
        homeworkId,
        homeworkConfig,
      );
      console.log("updatedHomework: ", updatedHomework);
    }
  };

  useEffect(() => {
    const fetchHomeworkConfig = async () => {
      try {
        if (homeworkId) {
          const data = await HomeworkAPI.getConfig(homeworkId);
          const { homeworkObj, classObjs } = data;
          const { homeworkShowResult, homeworkMustLogin } = homeworkObj;
          setHomeworkConfig({
            ...homeworkObj,
            homeworkShowResult: homeworkShowResult.toString(),
            homeworkMustLogin: homeworkMustLogin.toString(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClassGroup = async () => {
      try {
        const data = await ClassGroupAPI.getAll();
        setClassGroups(data);

        const assignClassIds: number[] = [];
        data.forEach((classGroup: ClassGroup) =>
          classGroup.Classes.forEach((classroom: Class) =>
            assignClassIds.push(classroom.id),
          ),
        );

        setHomeworkConfig((preValue) => ({
          ...preValue,
          classIds: assignClassIds,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeworkConfig();
    fetchClassGroup();
  }, []);
  console.log("homework config: ", homeworkConfig);
  console.log("classgroup: ", classGroups);

  return (
    <div className="mx-auto w-9/12 py-4">
      <h3 className="mb-2 text-sm font-semibold uppercase">Cấu hình chung</h3>

      <form action="">
        <div className="space-y-4 rounded-md bg-white p-5 shadow-md">
          <ConfigName values={homeworkConfig} onChange={handleChangeConfig} />

          <ConfigTime values={homeworkConfig} onChange={handleChangeConfig} />

          <ConfigFeature
            values={homeworkConfig}
            onChange={handleChangeConfig}
          />

          <ConfigAssignment
            values={homeworkConfig}
            onChange={handleChangeConfig}
            classGroups={classGroups}
          />
        </div>

        <div className="float-right mt-6 flex items-center gap-2 pb-20">
          <div className="rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
            Lưu nháp
          </div>
          <div
            onClick={handlePublish}
            className="rounded-md bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:cursor-pointer"
          >
            Xuất bản
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfigHomework;
