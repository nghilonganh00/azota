import { FileText, Upload, X } from "lucide-react";
import { Homework } from "../Interface/interface";
import FirebaseStorage from "../../../../../Firebase/firebaseStorage";
import HomeworkFileAPI from "../../../../../API/homeworkFileAPI";
import { useParams } from "react-router";

interface ConfigFileProps {
  homework: Homework;
  setHomework: React.Dispatch<React.SetStateAction<Homework>>;
}

const ConfigFile: React.FC<ConfigFileProps> = (props) => {
  const { homeworkId } = useParams();
  const { homework, setHomework } = props;
  const homworkFiles = homework.Homework.HomeworkFiles;

  const handleAddFile = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const homeworkFiles = (e.target as HTMLInputElement).files;

    if (homeworkFiles && homeworkId) {
      console.log("files: ", homeworkFiles);
      const homeworkFileObjs = await Promise.all(
        Array.from(homeworkFiles).map(async (homeworkFile) => {
          const uploadFile = await FirebaseStorage.upload(homeworkFile);
          return {
            homeworkFileName: homeworkFile.name,
            homeworkFileLink: uploadFile.downloadURL,
          };
        }),
      );

      await Promise.all(
        Array.from(homeworkFileObjs).map(async (homeworkFileObj) => {
          const newHomeworkFile = await HomeworkFileAPI.add(
            homework.Homework.id,
            homeworkFileObj.homeworkFileName,
            homeworkFileObj.homeworkFileLink,
          );
          setHomework((prevHomework) => ({
            ...prevHomework,
            Homework: {
              ...prevHomework.Homework,
              HomeworkFiles: [
                ...prevHomework.Homework.HomeworkFiles,
                newHomeworkFile,
              ],
            },
          }));
        }),
      );
    }
  };

  const handleDeleteFile = async (id: number) => {
    await HomeworkFileAPI.delete(id);
    setHomework((prevHomework) => ({
      ...prevHomework,
      Homework: {
        ...prevHomework.Homework,
        HomeworkFiles: prevHomework.Homework.HomeworkFiles.filter(
          (homeworkFile) => homeworkFile.id !== id,
        ),
      },
    }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">File đính kèm</div>
        <label className="hover:bg-cy inline-flex items-center gap-2 rounded-md p-2 hover:cursor-pointer">
          <Upload strokeWidth={1.5} className="size-4 text-blue-800" />
          <div className="text-xs font-semibold text-blue-900">Thêm File</div>
          <input type="file" className="hidden" onChange={handleAddFile} />
        </label>
      </div>

      <div className="text-xs text-gray-600">
        Hỗ trợ file định dạng ảnh, pdf, word, excel, audio hoặc video
      </div>

      <div className="space-y-2">
        {homworkFiles.map((homeworkFile, key) => (
          <div
            className="flex items-center justify-between"
            key={key}
            onClick={() => handleDeleteFile(homeworkFile.id)}
          >
            <div className="flex items-center gap-2 text-blue-900">
              <FileText strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{homeworkFile.hwfileName}</div>
            </div>
            <X
              className="size-4"
              strokeWidth={1.5}
              onClick={() => handleDeleteFile(homeworkFile.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigFile;
