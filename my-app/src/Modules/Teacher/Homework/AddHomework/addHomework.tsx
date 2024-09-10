import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ConfigTime from "./Components/configTime";
import ConfigContent from "./Components/configContent";
import ConfigName from "./Components/configName";
import ConfigFeature from "./Components/configFeature";
import ConfigAssignment from "./Components/configAssigment";
import Actions from "./Components/actions";
import { ClassGroup, NewHomework } from "./libs/interfaces";
import HomeworkAPI from "../../../../API/homeworkAPI";
import ClassGroupAPI from "../../../../API/classGroupAPI";
import { useNavigate } from "react-router";

const AddHomework = () => {
  const navigation = useNavigate();

  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [newHomework, setNewHomework] = useState<NewHomework>({
    homeworkName: "",
    homeworkContent: "",
    homeworkStartDate: "",
    homeworkEndDate: "",
    homeworkShowResult: "false",
    homeworkMustLogin: "false",
    homeworkFiles: [],
    classIds: [],
  });

  const handleChangeTextInput = (
    name: string,
    newValue: string | boolean | number[],
  ) => {
    setNewHomework((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handleChangeFileInput = (name: string, newValue: File[]) => {
    setNewHomework((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handlePublish = async () => {
    try {
      const createdHomework = await HomeworkAPI.create(newHomework);
      console.log("Created homework:", createdHomework);
      const hashIds = createdHomework.Assignments.map(
        (assignment: any) => assignment.hashId,
      );
      navigation(`/teacher/homework/publish-homework/${createdHomework.id}`);
    } catch (error) {
      console.log("Error creating homework:", error);
    }
  };

  useEffect(() => {
    const fetchClassGroupData = async () => {
      const data = await ClassGroupAPI.getAll();
      setClassGroups(data);
    };

    fetchClassGroupData();
  }, []);

  return (
    <div className="mx-auto w-9/12 py-4">
      <Helmet>
        <title>Thêm bài tập</title>
      </Helmet>

      <h3 className="mb-2 text-sm font-semibold">TẠO BÀI TẬP MỚI</h3>
      <form action="">
        <div className="space-y-4 rounded-md bg-white p-5 shadow-md">
          <ConfigName values={newHomework} onChange={handleChangeTextInput} />
          <ConfigTime values={newHomework} onChange={handleChangeTextInput} />
          <ConfigContent
            values={newHomework}
            onChangeText={handleChangeTextInput}
            onChangeFile={handleChangeFileInput}
          />
          <ConfigFeature
            values={newHomework}
            onChange={handleChangeTextInput}
          />
          <ConfigAssignment
            classgroups={classGroups}
            values={newHomework}
            onChange={handleChangeTextInput}
          />
        </div>

        <Actions onPublish={handlePublish} />
      </form>
    </div>
  );
};

export default AddHomework;
