import { Copy, FileText, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeworkAPI from "../../../../API/homeworkAPI";
import Notification from "../../../../Globals/Components/Notification/notification";
import ExamAPI from "../../../../API/examAPI";
import { ExamConfig } from "../../../../Globals/Interfaces/interface";

const PublishExam = () => {
  const { hashId } = useParams();

  const [examConfig, setExamConfig] = useState<ExamConfig>();
  const [isOpenCopyNoti, setOpenCopyNoti] = useState<boolean>(false);
  const examURL = `http://localhost:3000/exam/${hashId}`;

  const handleCopyHomeworkURL = (homeworkURL: string) => {
    navigator.clipboard.writeText(homeworkURL);
    setOpenCopyNoti(true);
  };

  useEffect(() => {
    const fetchExamConfig = async () => {
      if (hashId) {
        const data = await ExamAPI.getConfigByHashId(hashId);
        setExamConfig(data.examObj);
      }
    };

    fetchExamConfig();
  }, []);

  return (
    <div className="">
      <div className="mx-auto mt-10 w-[600px] space-y-4 text-center text-gray-900">
        <div>
          <div className="text-lg font-semibold text-gray-800">
            Xuất bản thành công 🎉{" "}
          </div>

          <div className="text-sm text-gray-900">
            Copy link bên dưới và gửi cho học sinh. Học sinh truy cập link để
            làm bài và nộp bài
          </div>
        </div>

        <div className="rounded-md bg-white px-3 py-3 text-left shadow-sm">
          {/* <div className="text-sm font-semibold">{homework.homeworkName}</div> */}

          <div className="space-y-1">
            <div className="mb-4 text-sm font-medium">
              {examConfig?.examName}
            </div>

            <div className="mt-2 flex items-center justify-between bg-slate-100 pl-4">
              <input
                type="text"
                readOnly
                value={examURL}
                className="flex-1 bg-transparent text-sm text-blue-800"
              />

              <div className="flex items-center gap-2 rounded-e-md border border-blue-800 px-3 py-3 text-blue-800 hover:cursor-pointer hover:bg-slate-200">
                <Copy strokeWidth={1.5} className="size-4" />

                <div
                  onClick={() => {
                    handleCopyHomeworkURL(examURL);
                  }}
                  className="text-sm font-semibold"
                >
                  Sao chép
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300">
            <FileText strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-medium">
              Quản lý danh sách nộp bài tập
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300">
            <Folder strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-medium">
              Về trang bài tập trong lớp
            </div>
          </div>
        </div>
      </div>

      <Notification
        message={"Sao chép thành công"}
        isOpen={isOpenCopyNoti}
        setOpen={setOpenCopyNoti}
        type={"SUCCESS"}
      />
    </div>
  );
};

export default PublishExam;
