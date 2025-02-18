import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeworkAPI from "../../../../API/homeworkAPI";
import { Homework } from "../../../../Globals/Interfaces/homework.interface";
import ConfigName from "./Layout/configName";
import ConfigTime from "./Layout/configTime";
import ConfigFeature from "./Layout/configFeature";
import ClassGroupAPI from "../../../../API/classGroupAPI";
import { ClassGroup } from "../AddHomework/libs/interfaces";
import ConfigAssignment from "./Layout/configAssignment";
import { Classroom } from "../../../../Globals/Interfaces/info.interface";

const ConfigHomework = () => {
  const { homeworkId } = useParams();
  const [homework, setHomework] = useState<Homework>({} as Homework);
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);

  const handleChangeConfig = (name: string, newValue: any) => {
    setHomework((preValues) => ({ ...preValues, [name]: newValue }));
  };

  const handlePublish = async () => {
    if (homeworkId) {
      const updatedHomework = await HomeworkAPI.update(homework);
      console.log("updatedHomework: ", updatedHomework);
    }
  };

  useEffect(() => {
    const fetchHomeworkConfig = async () => {
      try {
        if (homeworkId) {
          const response = await HomeworkAPI.getDetail(homeworkId);
          setHomework(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClassGroup = async () => {
      try {
        const response = await ClassGroupAPI.getAll();
        if (response?.status !== 200) return;

        const classgroupData = response.data;
        setClassGroups(classgroupData);

        const assignClassIds: number[] = [];
        classgroupData.forEach((classGroup: ClassGroup) =>
          classGroup.classrooms.forEach((classroom: Classroom) => assignClassIds.push(classroom.id)),
        );

        setHomework((preValue) => ({
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
  console.log("homework config: ", homework);
  console.log("classgroup: ", classGroups);

  return (
    <div className="mx-auto w-9/12 py-4">
      <h3 className="mb-2 text-sm font-semibold uppercase">Cấu hình chung</h3>

      <form action="">
        <div className="space-y-4 rounded-md bg-white p-5 shadow-md">
          <ConfigName values={homework} onChange={handleChangeConfig} />

          <ConfigTime values={homework} onChange={handleChangeConfig} />

          <ConfigFeature values={homework} onChange={handleChangeConfig} />

          <ConfigAssignment values={homework} onChange={handleChangeConfig} classGroups={classGroups} />
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
