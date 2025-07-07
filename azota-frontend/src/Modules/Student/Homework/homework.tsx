import { CalendarOff, Upload, User, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { HomeworkSubmission } from "../../../Globals/Interfaces/homework.interface";
import { useNavigate, useParams } from "react-router";
import { HomeworkSubmissionAPI } from "../../../API/homeworkSubmissionAPI";
import { DateTimeFormat, isoDateUtil } from "../../../Utils/date";
import { useNotification } from "../../../Globals/Context/NotificationContext";

const Homework = () => {
  const navigate = useNavigate();
  const { homeworkSubmissionId } = useParams();
  const { addNotification } = useNotification();
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);
  const [homeworkSubmission, setHomeworkSubmission] = useState<HomeworkSubmission>({} as HomeworkSubmission);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSubmissionFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...submissionFiles];
    newFiles.splice(index, 1);
    setSubmissionFiles(newFiles);
  };

  const handleSubmit = async () => {
    if (!homeworkSubmissionId || submissionFiles.length === 0) return;

    const response = await HomeworkSubmissionAPI.submit(homeworkSubmissionId, submissionFiles);

    if (response?.status !== 201) {
      addNotification("Lỗi khi nộp bài", "ERROR");
      return;
    }

    navigate(`/student/homework-submissions/${response.data.id}`);
    addNotification("Nộp bài thành công", "SUCCESS");
  };

  console.log("files: ", submissionFiles);

  useEffect(() => {
    const fetchHomeworkData = async () => {
      if (!homeworkSubmissionId) return;

      const response = await HomeworkSubmissionAPI.getDetail(homeworkSubmissionId);
      console.log(`Homework: ${response?.data}`);
      setHomeworkSubmission(response?.data);
    };

    fetchHomeworkData();
  }, []);

  return (
    <div className="px-4 pt-6">
      <Helmet>
        <title>Bài tập ngày 11/7</title>
      </Helmet>

      <div className="space-y-3 rounded-md bg-white p-3 shadow-sm dark:bg-darkmode-600 dark:text-slate-300">
        <div className="text-lg font-semibold">{homeworkSubmission?.homework?.title}</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <svg
              _ngcontent-ng-c931010807=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide mr-2 h-4 w-4"
            >
              <path _ngcontent-ng-c931010807="" d="M6 20h4"></path>
              <path _ngcontent-ng-c931010807="" d="M14 10h4"></path>
              <path _ngcontent-ng-c931010807="" d="M6 14h2v6"></path>
              <path _ngcontent-ng-c931010807="" d="M14 4h2v6"></path>
              <rect _ngcontent-ng-c931010807="" x="6" y="4" width="4" height="6"></rect>
              <rect _ngcontent-ng-c931010807="" x="14" y="14" width="4" height="6"></rect>
            </svg>
            <div className="mr-1 text-sm">Mã bài tập: </div>
            <div className="text-sm font-semibold">{homeworkSubmission?.homework?.hashId}</div>
          </div>
          <div className="flex items-center">
            <svg
              _ngcontent-ng-c931010807=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide mr-2 h-4 w-4"
            >
              <rect _ngcontent-ng-c931010807="" x="3" y="3" width="7" height="7"></rect>
              <rect _ngcontent-ng-c931010807="" x="14" y="3" width="7" height="7"></rect>
              <rect _ngcontent-ng-c931010807="" x="14" y="14" width="7" height="7"></rect>
              <rect _ngcontent-ng-c931010807="" x="3" y="14" width="7" height="7"></rect>
            </svg>
            <div className="text-sm">Lớp: </div>
            <div className="text-sm font-semibold">{homeworkSubmission?.homework?.classroom?.className}</div>
          </div>
          <div className="flex items-center">
            <User strokeWidth={1.5} className="mr-2 size-4" />
            <div className="mr-1 text-sm">Tên học sinh: </div>
            <div className="text-sm font-semibold">{homeworkSubmission?.studentClass?.fullname}</div>
          </div>

          {homeworkSubmission?.homework?.startDate && (
            <div className="flex items-center">
              <CalendarOff strokeWidth={1.5} className="mr-2 size-4" />
              <div className="text-sm">
                {`Ngày tạo: ${isoDateUtil.toDateAndTime(homeworkSubmission?.homework?.startDate, DateTimeFormat.FULL_DATE_TIME_FORMAT)}`}
              </div>
            </div>
          )}

          {homeworkSubmission?.homework?.endDate && (
            <div className="flex items-center">
              <CalendarOff strokeWidth={1.5} className="mr-2 size-4" />
              <div className="text-sm">
                {`Hạn nộp: ${homeworkSubmission?.homework?.endDate ? `${isoDateUtil.toDateAndTime(homeworkSubmission?.homework?.endDate, DateTimeFormat.FULL_DATE_TIME_FORMAT)}` : "Không giới hạn"}`}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4 border-y border-gray-200 dark:border-darkmode-400">
          <div
            className="pt-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: homeworkSubmission?.homework?.content,
            }}
          ></div>
          <div className="grid grid-cols-12 gap-6">
            {homeworkSubmission?.homework?.homeworkFiles?.map((file) => {
              return (
                <div className="col-span-3" key={file.id}>
                  <a href={file.link} target="_blank">
                    <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2 dark:border-darkmode-400">
                      <div className="size-12 rounded-md bg-blue-400">
                        <img src={file.link} alt={file.title} className="size-full" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold">{file.title}</div>
                        <div className="text-xs text-gray-600">Hình ảnh</div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            {submissionFiles.map((file: File, index) => (
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300" key={index}>
                <X strokeWidth={1.5} className="size-4 cursor-pointer" onClick={() => handleRemoveFile(index)} />
                <div className="text-sm">{file.name}</div>
              </div>
            ))}
          </div>

          <label className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 p-2 hover:cursor-pointer dark:border-darkmode-400">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 pt-28">
                <Upload strokeWidth={1.5} className="size-4" />
                <div className="text-sm text-blue-800 dark:text-blue-600">Tải file lên</div>
              </div>
              <div className="mt-1 pb-6 text-sm text-gray-700 dark:text-slate-400">
                (Hỗ trợ Ảnh, Video, Excel, PPT, Audio hoặc File PDF)
              </div>
            </div>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <div className="text-center">
            <button
              type="button"
              className="rounded-md bg-blue-800 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:cursor-pointer"
              onClick={handleSubmit}
            >
              Nộp bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
