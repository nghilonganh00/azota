import { SetStateAction } from "react";
import UserAvatar from "../../../../../Globals/Components/userAvatar";
import { Editor } from "@tinymce/tinymce-react";
import { HomeworkSubmissionAPI } from "../../../../../API/homeworkSubmissionAPI";
import { useNavigate, useParams } from "react-router";
import useGoBack from "../../../../../Globals/Hooks/useGoBack";
import { HomeworkSubmission } from "../../../../../Globals/Interfaces/homework.interface";
import { UpdateHomeworkSubmission } from "../interface/interface";

const PointTypes = {
  Pass: "Đ",
  NotPass: "CĐ",
  Done: "HT",
  NotDone: "CHT",
  WellDont: "HHT",
};

interface MarkAreaProps {
  homeworkSubmission: HomeworkSubmission | null;
  updateHomeworkSubmission: UpdateHomeworkSubmission | null;
  setUpdateHomeworkSubmission: React.Dispatch<SetStateAction<UpdateHomeworkSubmission>>;
}

export const MarkArea: React.FC<MarkAreaProps> = (props) => {
  const { homeworkSubmissionId } = useParams();
  const navigate = useNavigate();

  const { homeworkSubmission, updateHomeworkSubmission, setUpdateHomeworkSubmission } = props;

  const handleMark = (point: string) => {
    setUpdateHomeworkSubmission((preValue) => ({
      ...preValue,
      point,
    }));
  };

  const handleComment = (comment: string) => {
    setUpdateHomeworkSubmission((preValue) => ({
      ...preValue,
      comment,
    }));
  };

  const handleChangeShowPointOption = () => {
    setUpdateHomeworkSubmission((preValue) => ({
      ...preValue,
      isShowPoint: !preValue.isShowPoint,
    }));
  };

  const handleRequestResend = async () => {
    if (!homeworkSubmissionId) return;

    const response = await HomeworkSubmissionAPI.requestResend(homeworkSubmissionId);
  };

  const handleSave = async () => {
    if (!homeworkSubmissionId) return;

    const { point = "", comment = "", isShowPoint = false } = updateHomeworkSubmission || {};

    const response = await HomeworkSubmissionAPI.mark(homeworkSubmissionId, comment, point, isShowPoint);

    if (response?.status === 200) {
      navigate(-1);
    }
  };

  return (
    <div className="col-span-4">
      <div className="space-y-3 rounded-md bg-white p-2 shadow-sm dark:bg-darkmode-600 dark:text-slate-300">
        <div className="text-sm font-semibold">{homeworkSubmission?.homework?.title || ""}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar fullname="Lê Văn Thiện" className={"size-9"} />
            <div>
              <div className="text-sm">{homeworkSubmission?.studentClass?.fullname || ""}</div>
              <div className="text-xs">{homeworkSubmission?.homework?.classroom?.className || ""}</div>
            </div>
          </div>
          <input
            type="text"
            value={updateHomeworkSubmission?.point || ""}
            onChange={(e) => handleMark(e.target.value)}
            className="w-48 rounded-md border border-gray-200 p-2 text-sm font-semibold shadow-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập điểm"
          />
        </div>
        <div className="w-full bg-slate-200 py-2 text-center text-sm dark:bg-darkmode-400">
          Chưa có số câu đúng, câu sai
        </div>
        <div className="flex items-center justify-center gap-2 lg:justify-around">
          {Object.values(PointTypes).map((point, key) => (
            <div
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 shadow-sm hover:cursor-pointer hover:bg-slate-200 dark:border-darkmode-400"
              key={key}
            >
              <div className="text-sm font-semibold" onClick={() => handleMark(point)}>
                {point}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Nhận xét</div>
          <Editor
            apiKey="ur0vhjauqc7v03itiycm0yhxvtyspax1lvujfy0s1hv6d2t4"
            init={{
              height: 370,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "fontfamily fontsize | bold italic underline | align lineheight | emoticons charmap | removeformat",
              toolbar_mode: "floating",
              menubar: false,
              tinycomments_mode: "embedded",

              ai_request: (request: any, respondWith: any) =>
                respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            value={updateHomeworkSubmission?.comment}
            onEditorChange={handleComment}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              id="isShowPoint"
              checked={updateHomeworkSubmission?.isShowPoint || false}
              onChange={handleChangeShowPointOption}
              className="peer sr-only"
            />
            <div className="peer relative h-6 w-11 rounded-full border border-slate-400 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-slate-400 after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-sm">Hiện thị điểm</span>
          </label>
          <div
            className="flex items-center justify-center rounded-md bg-orange-500 px-3 py-2 shadow-sm hover:cursor-pointer"
            onClick={handleRequestResend}
          >
            <div className="text-sm font-semibold text-white">Yêu cầu nộp lại</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <div
              className="rounded-md border border-gray-200 bg-gray-100 py-2.5 shadow-sm dark:border-none dark:bg-darkmode-400"
              onClick={() => navigate(-1)}
            >
              <div className="text-center text-sm font-semibold text-gray-500">Quay lại</div>
            </div>
          </div>
          <div className="col-span-6">
            <div
              className="rounded-md border border-none border-gray-200 bg-blue-800 py-2.5 shadow-sm hover:cursor-pointer"
              onClick={handleSave}
            >
              <div className="text-center text-sm font-semibold text-white">Lưu dữ liệu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
