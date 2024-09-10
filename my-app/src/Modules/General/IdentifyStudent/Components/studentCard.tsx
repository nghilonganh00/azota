import { useState } from "react";
import { CircleAlert, CircleCheckBig, OctagonAlert } from "lucide-react";
import Popup from "../../../../Globals/Components/popup";
import { isoDateUtil } from "../../../../Utils/date";
import StudentAvatar from "../../../Teacher/Homework/ResultsList/Components/avatar";
import { Student } from "../../../Teacher/Homework/ResultsList/Interface/interface";
import StudentAPI from "../../../../API/studentAPI";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = (props) => {
  const { student } = props;

  const [openConfirmPopup, setOpenConfirmPopup] = useState<boolean>(false);
  const [openReportPopup, setOpenReportPopup] = useState<boolean>(false);

  const handleIdenify = () => {
    student.userId ? setOpenReportPopup(true) : setOpenConfirmPopup(true);
  };

  const handleConfirm = async () => {
    const confirmedStudent = await StudentAPI.confirm(student.id);
  };

  const handleReport = async () => {
    // const report
  };

  return (
    <div className="col-span-4">
      <div
        className={
          "flex items-center gap-3 rounded-md bg-[#c1d9f159] px-2 py-4 shadow-sm duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-md " +
          (student.userId && "opacity-50")
        }
        onClick={() => handleIdenify()}
      >
        <StudentAvatar fullname={"Lê Văn Thiện"} />
        <div>
          <div className="mb-1 text-sm font-semibold">
            {student.studentName}
          </div>
          <div className="text-xs font-medium text-gray-500">
            {student.HomeworkResults[0]?.confirmedAt &&
              isoDateUtil.toDateTime(student.HomeworkResults[0].confirmedAt)}
          </div>
          <div className="text-xs font-medium text-gray-500">
            {student.userId && "Đã được chọn"}
          </div>
        </div>
      </div>

      <Popup isOpen={openConfirmPopup} setOpen={setOpenConfirmPopup}>
        <div className="rounded-md bg-white p-4">
          <div className="flex items-center gap-2">
            <CircleCheckBig className="size-6 text-lime-600" />
            <div className="text-sm font-semibold">Bạn có chắc chắn chọn</div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Bạn vui lòng chọn đúng tên của mình, hệ thống sẽ ghi nhận bài làm
            của bạn theo tên đã chọn
          </div>

          <div className="float-right mt-8 flex items-center gap-2">
            <div
              className="rounded-md bg-gray-200 px-3 py-2 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => setOpenConfirmPopup(false)}
            >
              <div className="text-sm font-semibold text-gray-600">Đóng</div>
            </div>
            <div
              className="rounded-md bg-blue-800 px-3 py-2 hover:cursor-pointer hover:bg-blue-700"
              onClick={handleConfirm}
            >
              <div className="text-sm font-semibold text-white">Xác nhận</div>
            </div>
          </div>
        </div>
      </Popup>

      <Popup isOpen={openReportPopup} setOpen={setOpenReportPopup}>
        <div className="w-6/12 rounded-md bg-white p-4">
          <div className="flex items-center gap-2">
            <OctagonAlert className="size-6 text-orange-500" />
            <div className="text-sm font-semibold">
              Học sinh này đã được chọn
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-800">
            Học sinh{" "}
            <span className="font-semibold text-black">Nguyễn Tuấn Anh </span>{" "}
            đã được chọn bởi tài khoản có địa chỉ email. Nếu bạn chắc chắn đó
            không phải tài khoản của bạn, vui lòng bấm nút{" "}
            <span className="font-semibold text-black">Báo giáo viên</span> để
            giáo viên kiểm tra lại
          </div>

          <div className="float-right mt-8 flex items-center gap-2">
            <div
              className="rounded-md bg-gray-200 px-3 py-2 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => setOpenReportPopup(false)}
            >
              <div className="text-sm font-semibold text-gray-600">Đóng</div>
            </div>
            <div className="rounded-md bg-blue-800 px-3 py-2 hover:cursor-pointer hover:bg-blue-700">
              <div className="text-sm font-semibold text-white">Xác nhận</div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default StudentCard;
