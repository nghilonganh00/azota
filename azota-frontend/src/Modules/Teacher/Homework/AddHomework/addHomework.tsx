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
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    isShowResult: false,
    isMustLogin: false,
    isInTrash: false,
    classroomIds: [],
    homeworkFiles: [],
  });

  const handleChangeTextInput = (name: string, newValue: string | boolean | number[]) => {
    setNewHomework((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handleChangeFileInput = (name: string, newValue: File[]) => {
    setNewHomework((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handlePublish = async () => {
    try {
      const createdHomework = await HomeworkAPI.create(newHomework);

      navigation(`/teacher/homework/publish-homework/${createdHomework[0].id}`);
    } catch (error) {
      console.log("Error creating homework:", error);
    }
  };

  useEffect(() => {
    const fetchClassGroupData = async () => {
      const response = await ClassGroupAPI.getAll();

      if (response?.status !== 200) return;

      setClassGroups(response.data);
    };

    fetchClassGroupData();
  }, []);

  return (
    <div className="mx-auto max-w-[1000px] p-4 dark:text-slate-300">
      <Helmet>
        <title>Thêm bài tập</title>
      </Helmet>

      <h3 className="mb-2 text-sm font-semibold">TẠO BÀI TẬP MỚI</h3>
      <form onSubmit={handlePublish}>
        <div className="space-y-4 rounded-md bg-white p-5 shadow-md dark:bg-[rgb(var(--color-darkmode-600))]">
          <ConfigName values={newHomework} onChange={handleChangeTextInput} />
          <ConfigTime values={newHomework} onChange={handleChangeTextInput} />
          <ConfigContent
            values={newHomework}
            onChangeText={handleChangeTextInput}
            onChangeFile={handleChangeFileInput}
          />
          <ConfigFeature values={newHomework} onChange={handleChangeTextInput} />
          <ConfigAssignment classgroups={classGroups} values={newHomework} onChange={handleChangeTextInput} />
        </div>

        <Actions onPublish={handlePublish} />
      </form>
    </div>
  );
};

export default AddHomework;
