import { useEffect, useState } from "react";
import ClassActions from "./Layout/classActions";
import ClassList from "./Layout/classList";
import ClassGroupAPI from "../../../../API/classGroupAPI";
import { ClassGroup } from "../../Homework/AddHomework/libs/interfaces";
import StudentProfileAPI from "../../../../API/studentProfileAPI";
import { useParams } from "react-router";

const ClassManage = () => {
  const { classId } = useParams();
  console.log("classId: ", classId);
  const [classGroupList, setClassGroupList] = useState<ClassGroup[]>([]);

  useEffect(() => {
    const fetchClassGroups = async () => {
      const data = await ClassGroupAPI.getAll();

      setClassGroupList(data);
    };

    fetchClassGroups();
  }, []);

  return (
    <div className="space-y-4 p-6">
      <ClassActions
        classGroupList={classGroupList}
        setClassGroupList={setClassGroupList}
      />

      <ClassList classGroupList={classGroupList} />
    </div>
  );
};

export default ClassManage;
