import ExamActions from "./Layouts/examActions";
import RecommendExams from "./Layouts/recommendExams";
import AllExams from "./Layouts/allExams";
import { useEffect, useState } from "react";
import ExamAPI from "../../../../API/examAPI";
import { ExamConfig } from "../../../../Globals/Interfaces/interface";
import { ExamPreview } from "./libs/interface";

const ExamManage = () => {
  const [listExamConfig, setListExamConfig] = useState<ExamPreview[]>([]);

  useEffect(() => {
    const fetchAllExamConfig = async () => {
      const data = await ExamAPI.getAllConfigs();
      setListExamConfig(data);
    };

    fetchAllExamConfig();
  }, []);

  console.log("list exam config: ", listExamConfig);

  return (
    <div className="space-y-4 p-6">
      <ExamActions />
      <RecommendExams listExamPrevies={listExamConfig} />
      <AllExams listExamConfig={listExamConfig} />
    </div>
  );
};

export default ExamManage;