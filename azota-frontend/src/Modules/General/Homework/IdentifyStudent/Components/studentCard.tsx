import { useState } from "react";
import { CircleCheckBig, OctagonAlert } from "lucide-react";
import Popup from "../../../../../Globals/Components/popup";
import { isoDateUtil } from "../../../../../Utils/date";
import StudentAvatar from "../../../../Teacher/Homework/ResultsList/Components/avatar";
import { StudentClass } from "../../../../../Globals/Interfaces/info.interface";
import { StudentClassroomAPI } from "../../../../../API/studentClassAPI";
import { useNavigate, useParams } from "react-router";

interface StudentCardProps {
  studentClass: StudentClass;
}

const StudentCard: React.FC<StudentCardProps> = (props) => {
  const { studentClass } = props;

  const navigate = useNavigate();
  const { hashId } = useParams();
  const [openConfirmPopup, setOpenConfirmPopup] = useState<boolean>(false);
  const [openReportPopup, setOpenReportPopup] = useState<boolean>(false);

  const handleIdenify = () => {
    studentClass.student ? setOpenReportPopup(true) : setOpenConfirmPopup(true);
  };

  const handleConfirm = async () => {
    const response = await StudentClassroomAPI.identify(studentClass.id);
    console.log(`${response}`);
    if (response.status === 200) {
      navigate(`/student/homework/${hashId}/student-class/${studentClass.id}`);
    }
  };

  const handleReport = async () => {
    // const report
  };

  console.log(`student: ${studentClass}`);

  return (
    <div className="col-span-4">
      <div
        className={
          "flex items-center gap-3 rounded-md bg-[#c1d9f159] px-2 py-4 opacity-100 shadow-sm duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-md " +
          (studentClass.student && "opacity-50")
        }
        onClick={() => handleIdenify()}
      >
        <StudentAvatar fullname={studentClass.fullname} />
        <div>
          <div className="mb-1 text-sm font-semibold">{studentClass.fullname}</div>
          <div className="text-xs font-medium text-gray-500">
            {studentClass.student && isoDateUtil.toDateTime(studentClass.confirmedAt)}
          </div>
          <div className="text-xs font-medium text-gray-500">{studentClass.student && "Đã được chọn"}</div>
        </div>
      </div>

      <Popup isOpen={openConfirmPopup} setOpen={setOpenConfirmPopup}>
        <div className="rounded-md bg-white p-4">
          <div className="flex items-center gap-2">
            <CircleCheckBig className="size-6 text-lime-600" />
            <div className="text-sm font-semibold">Bạn có chắc chắn chọn</div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Bạn vui lòng chọn đúng tên của mình, hệ thống sẽ ghi nhận bài làm của bạn theo tên đã chọn
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
            <div className="text-sm font-semibold">Học sinh này đã được chọn</div>
          </div>
          <div className="mt-2 text-sm text-gray-800">
            Học sinh <span className="font-semibold text-black">Nguyễn Tuấn Anh </span> đã được chọn bởi tài khoản có
            địa chỉ email. Nếu bạn chắc chắn đó không phải tài khoản của bạn, vui lòng bấm nút{" "}
            <span className="font-semibold text-black">Báo giáo viên</span> để giáo viên kiểm tra lại
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
