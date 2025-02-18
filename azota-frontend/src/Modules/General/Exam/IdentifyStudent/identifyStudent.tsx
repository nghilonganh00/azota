import { useEffect, useState } from "react";
import { CreateAnonymousLayout } from "./layouts/createAnonymousLayout";
import { Exam } from "../TakeTraining/libs/interface";
import { useNavigate, useParams } from "react-router";
import ExamAPI from "../../../../API/examAPI";
import { NotLoggedInLayout } from "./layouts/notLoggedinLayout";
import { ExamAssignType, ExamType } from "../../../../Globals/Constant/constant";

export const IdentifyStudent = () => {
  const navigate = useNavigate();
  const { hashId } = useParams();
  const [exam, setExam] = useState<Exam | null>(null);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchExamData = async () => {
      if (!hashId) return;

      const response = await ExamAPI.previewByHashId(hashId);

      if (response?.status !== 200) return;

      const examData = response.data;

      setExam(examData);
    };

    fetchExamData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !exam) return;

    if (exam?.type === ExamType.PRACTICE) {
      navigate(`/exam/${hashId}/take-training`);
    } else if (exam?.type === ExamType.TEST) {
      navigate(`/exam/${hashId}/take-exam`);
    }
  }, [exam]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#3c3c3c80]">
      {exam?.assignType === ExamAssignType.ALL && !isLoggedIn && <CreateAnonymousLayout />}
      {exam?.assignType !== ExamAssignType.ALL && !isLoggedIn && <NotLoggedInLayout />}
    </div>
  );
};
