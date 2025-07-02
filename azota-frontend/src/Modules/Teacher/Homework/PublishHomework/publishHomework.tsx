import { Copy, FileText, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeworkAPI from "../../../../API/homeworkAPI";
import { Homework } from "../ConfigHomework/interface";
import { Classroom } from "./Interfaces/interfaces";
import { usePopup } from "../../../../Globals/Components/Popup/popup";

const PublishHomework = () => {
  const { homeworkId } = useParams();
  const { handleNotify, Popup } = usePopup();

  const [homework, setHomework] = useState<Homework>({} as Homework);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  const handleCopyHomeworkURL = (homeworkURL: string) => {
    navigator.clipboard.writeText(homeworkURL);

    handleNotify("Sao chép thành công", "SUCCESS");
  };

  useEffect(() => {
    const fetchHomeworkConfig = async () => {
      if (homeworkId) {
        const response = await HomeworkAPI.getConfig(homeworkId);

        setClassrooms(response.data.classObjs);
        setHomework(response.data.homeworkObj);

        console.log("classrooms: ", classrooms);
        console.log("homework: ", homework);
      }
    };

    fetchHomeworkConfig();
  }, []);

  return (
    <div className="">
      <div className="mx-auto mt-10 w-[600px] space-y-4 text-center text-gray-900">
        <div>
          <div className="text-lg font-semibold text-gray-800"> Xuất bản thành công 🎉 </div>

          <div className="text-sm text-gray-900">
            Copy link bên dưới và gửi cho học sinh. Học sinh truy cập link để làm bài và nộp bài
          </div>
        </div>

        <div className="rounded-md bg-white p-3 text-left shadow-sm">
          <div className="text-sm font-semibold">{homework.homeworkName}</div>

          <div className="space-y-1">
            {classrooms.map((classroom) => {
              const homeworkURL = `http://localhost:3000/homework/`;

              return (
                <div key={classroom.id}>
                  <div className="mt-3 text-sm">{classroom.className}</div>

                  <div className="mt-2 flex items-center justify-between bg-slate-100 pl-4">
                    <input type="text" readOnly value={homeworkURL} className="flex-1 bg-transparent" />

                    <div className="flex items-center gap-2 rounded-e-md border border-blue-800 px-3 py-3 text-blue-800 hover:cursor-pointer hover:bg-slate-200">
                      <Copy strokeWidth={1.5} className="size-4" />

                      <div
                        onClick={() => {
                          handleCopyHomeworkURL(homeworkURL);
                        }}
                        className="text-sm font-semibold"
                      >
                        Sao chép
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300">
            <FileText strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">Quản lý danh sách nộp bài tập</div>
          </div>

          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300">
            <Folder strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">Về trang bài tập trong lớp</div>
          </div>
        </div>
      </div>

      <Popup />
    </div>
  );
};

export default PublishHomework;
