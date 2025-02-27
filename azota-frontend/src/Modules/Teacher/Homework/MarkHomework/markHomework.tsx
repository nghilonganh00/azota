import React, { useEffect, useState } from "react";
import { HomeworkSubmissionAPI } from "../../../../API/homeworkSubmissionAPI";
import { useParams } from "react-router";
import { UpdateHomeworkSubmission } from "./interface/interface";
import { MarkArea } from "./Layout/markArea";
import { GraphicMarkArea } from "./Layout/graphicMarkArea";
import { HomeworkSubmission } from "../../../../Globals/Interfaces/homework.interface";

const MarkHomework = () => {
  const { homeworkSubmissionId } = useParams();

  const [homeworkSubmission, setHomeworkSubmission] = useState<HomeworkSubmission | null>(null);

  const [updateHomeworkSubmission, setUpdateHomeworkSubmission] =
    useState<UpdateHomeworkSubmission>({
      point: "",
      comment: "",
      isShowPoint: false,
    });

  useEffect(() => {
    document.title = "Chấm điểm";

    const fetchSubmissionData = async () => {
      if (!homeworkSubmissionId) return;

      const response = await HomeworkSubmissionAPI.getDetail(homeworkSubmissionId);
      if (response?.status !== 200) {
        return;
      }
      setHomeworkSubmission(response.data);
      setUpdateHomeworkSubmission({
        point: response?.data?.point,
        comment: response?.data?.comment,
        isShowPoint: response?.data?.isShowPoint,
      });
    };

    fetchSubmissionData();
  }, []);

  return (
    <div className="p-3">
      <div className="grid grid-cols-12 gap-4">
        <GraphicMarkArea homeworkSubmission={homeworkSubmission} />

        <MarkArea
          homeworkSubmission={homeworkSubmission}
          updateHomeworkSubmission={updateHomeworkSubmission}
          setUpdateHomeworkSubmission={setUpdateHomeworkSubmission}
        />
      </div>
    </div>
  );
};

export default MarkHomework;
