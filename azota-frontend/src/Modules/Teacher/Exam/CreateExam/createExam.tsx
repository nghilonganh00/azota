import { Helmet } from "react-helmet";
import { useState } from "react";
import ExamNameConfig from "./Components/examNameConfig";
import convertToJSON from "../Editor/Utils/formatExam";
import ExamAPI from "../../../../API/examAPI";
import { useNavigate } from "react-router";
import GradeDropdown from "./Components/gradeDropdown";
import SubjectDropdown from "./Components/subjectDropdown";
import { Tab } from "../../../../Globals/Interfaces/interface";
import PurposeDropdown from "./Components/purposeDropdown";
import { CreateExam as ICreateExam } from "./libs/interface";

const CreateExam = () => {
  const navigate = useNavigate();
  const [newExam, setNewExam] = useState<ICreateExam>({
    examName: localStorage.getItem("exam_config") || "",
    gradeId: "",
    subjectId: "",
    purposeId: "",
    examDescribe: "",
    examContent: convertToJSON(localStorage.getItem("exam") || ""),
  });
  const [selectedGrade, setSelectedGrade] = useState<Tab | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Tab | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<Tab | null>(null);

  const handleChangeTextInput = (name: string, newValue: string) => {
    setNewExam((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handleSubmit = async () => {
    if (!newExam.examName || !selectedGrade || !selectedPurpose || !selectedSubject) {
      return;
    }

    const newExamData: ICreateExam = {
      ...newExam,
      gradeId: selectedGrade.value.toString(),
      purposeId: selectedPurpose.value.toString(),
      subjectId: selectedSubject.value.toString(),
    };

    const response = await ExamAPI.create(newExamData);
    if (response?.status === 201) {
      const newExam = response.data;

      navigate(`/teacher/exam/config-exam-online/${newExam.id}`);
    }
  };

  return (
    <div className="mx-auto h-full w-[1000px] max-w-[94vw] py-4 dark:text-slate-300">
      <Helmet>
        <title>Azota - Nền Tảng Tạo Đề Thi, Bài Tập Online</title>
      </Helmet>

      <h3 className="mb-2 text-sm font-semibold uppercase">Cấu hình chung</h3>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md bg-white p-5 shadow-md dark:bg-darkmode-600">
          <ExamNameConfig values={newExam} onChange={handleChangeTextInput} />

          <div className="grid grid-cols-12 gap-4">
            <GradeDropdown selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} />

            <SubjectDropdown
              selectedGradeId={selectedGrade?.value || null}
              selectedValue={selectedSubject}
              setSelectValue={setSelectedSubject}
            />
          </div>

          <PurposeDropdown selectedValue={selectedPurpose} setSelectValue={setSelectedPurpose} />

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-5">
              <span className="mb-2 flex text-sm font-medium">Cấu hình giá</span>

              <div className="mb-2 text-xs text-gray-500">
                Chức năng này giúp giáo viên, người tạo đề có thể đặt giá thu phí người tham gia thi, Azota đóng vai trò
                trung gian cung cấp nền tảng và thu hộ, hàng tháng Azota sẽ đối soát và chuyển khoản về tài khoản ngân
                hàng của giáo viên/người tạo đề.{" "}
                <span className="text-red-600">Lưu ý: Chắc chắn rằng bạn đã đủ 18 tuổi để sử dụng chức năng này</span>
                <span className="font-medium text-blue-800">Tìm hiểu thêm</span>
              </div>
            </div>

            <div className="col-span-7">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="priceConfigFree"
                    name="priceConfig"
                    value="free"
                    defaultChecked
                    // checked={selectedOption === "free"}
                    // onChange={handleOptionChange}
                  />
                  <label htmlFor="priceConfigFree" className="text-sm">
                    Miễn phí
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="priceConfigFee"
                    name="priceConfig"
                    value="fee"
                    // checked={selectedOption === "fee"}
                    // onChange={handleOptionChange}
                  />
                  <label htmlFor="priceConfigFee" className="text-sm">
                    Thu phí khi tham gia thi
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="priceConfigViewFee"
                    name="priceConfig"
                    value="viewFee"
                    // checked={selectedOption === "viewFee"}
                    // onChange={handleOptionChange}
                  />
                  <label htmlFor="priceConfigViewFee" className="text-sm">
                    Thu phí khi xem giải thích
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="mb-2 flex text-sm font-medium">Mô tả</span>

            <textarea
              className="h-36 w-full resize-y rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm"
              placeholder="Nhập mô tả"
              value={newExam["examDescribe"]}
              onChange={(e) => handleChangeTextInput("examDescribe", e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <div className="rounded-md bg-gray-100 px-8 py-2.5 hover:cursor-pointer">
            <div className="text-sm font-semibold text-slate-500">Hủy</div>
          </div>

          <div
            onClick={handleSubmit}
            className="rounded-md bg-blue-800 px-9 py-2.5 hover:cursor-pointer hover:bg-blue-700"
          >
            <div className="text-sm font-semibold text-white">Lưu</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
