import { CircleHelp, ClipboardType, Clock, QrCode, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ExamAPI from "../../../../API/examAPI";
import { ExamConfig } from "../../../../Globals/Interfaces/interface";

const StartExam = () => {
  const navigate = useNavigate();
  const { hashId } = useParams();
  const [examConfig, setExamConfig] = useState<ExamConfig>();

  const { examName, examDuration, questionTotal } = examConfig ?? {};

  const handleStartExam = () => {
    navigate(`/exam/take-training/${hashId}`);
  };

  useEffect(() => {
    const fetchExamConfigData = async () => {
      if (hashId) {
        const data = await ExamAPI.getConfigByHashId(hashId);
        setExamConfig(data.examObj);
      }
    };

    fetchExamConfigData();
  }, [hashId]);

  console.log("exam: ", examConfig);

  return (
    <div className="w-full pt-10">
      <div className="mx-auto w-[570px] text-center">
        <div className="rounded-md bg-white px-4 py-5 text-center shadow">
          <div className="text-lg font-medium">{examConfig?.examName}</div>

          <div className="mt-4 flex w-full items-center justify-center gap-4">
            <div className="text-sm font-medium">{`Mã đề thi: ${hashId}`}</div>

            <QrCode strokeWidth={1.5} className="text-blue-800" />
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <Clock strokeWidth={1.5} className="c-lucide mr-2 size-4" />
                Thời gian làm bài
              </div>

              <div className="font-medium">{`${examDuration} phút`}</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <CircleHelp
                  strokeWidth={1.5}
                  className="c-lucide mr-2 size-4"
                />
                Số lượng câu hỏi
              </div>

              <div className="font-medium">{questionTotal}</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <ClipboardType
                  strokeWidth={1.5}
                  className="c-lucide mr-2 size-4"
                />
                Loại đề
              </div>

              <div className="font-medium">Trắc nghiệm</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Users strokeWidth={1.5} className="c-lucide mr-2 size-4" />
                Số lượt làm đề
              </div>

              <div className="font-medium">{`${examConfig?.examSubmitCount} lượt`}</div>
            </div>
          </div>

          <div
            className="mt-4 rounded-md bg-orange-500 py-2 hover:cursor-pointer"
            onClick={handleStartExam}
          >
            <div className="text-sm font-medium text-white">
              Bắt đầu luyện tập
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-md p-2 shadow">
          <div className="text-sm font-medium text-slate-500">
            Xem lịch sử làm bài
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartExam;