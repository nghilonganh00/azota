import { useEffect, useState } from "react";
import ClassActions from "./Layout/classActions";
import ClassList from "./Layout/classList";
import ClassGroupAPI from "../../../../API/classGroupAPI";
import { ClassGroup } from "../../Homework/AddHomework/libs/interfaces";
import { Helmet } from "react-helmet";

const ClassManage = () => {
  const [classGroupList, setClassGroupList] = useState<ClassGroup[]>([]);

  useEffect(() => {
    const fetchClassGroups = async () => {
      const response = await ClassGroupAPI.getAll();

      if (response?.status !== 200) return;

      setClassGroupList(response.data);
    };

    fetchClassGroups();
  }, []);

  return (
    <div className="space-y-4 p-6 dark:text-slate-200">
      <Helmet>
        <title>Quản lý lớp học</title>
      </Helmet>

      <ClassActions classGroupList={classGroupList} setClassGroupList={setClassGroupList} />

      <ClassList classGroupList={classGroupList} />
    </div>
  );
};

export default ClassManage;
