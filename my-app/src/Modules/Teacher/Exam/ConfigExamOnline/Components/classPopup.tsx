import { AlignJustify, Divide, Search } from "lucide-react";
import { Fragment, useState } from "react";
import { Classroom } from "../libs/interface";
import Popup from "../../../../../Globals/Components/popup";
import Searchbar from "../../../../../Globals/Components/Searchbar/searchbar";

interface ClassroomPopupProps {
  classroom: Classroom;
}

const ClassroomPopup: React.FC<ClassroomPopupProps> = (props) => {
  const { classroom } = props;
  const { className, studentCount, Students } = classroom;

  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);

  return (
    <Fragment>
      <div
        className="col-span-4 flex items-center gap-2 hover:cursor-pointer hover:text-blue-700"
        onClick={() => setOpenPopup(true)}
      >
        <AlignJustify strokeWidth={1.5} className="size-4" />
        <div className="text-sm">{`${classroom.className}(${classroom.studentCount})`}</div>
      </div>

      {isOpenPopup && (
        <Popup isOpen={isOpenPopup} setOpen={setOpenPopup}>
          <div className="w-[1000px] shadow">
            <div className="rounded-t-md bg-slate-100 px-3 py-3.5">
              <div className="font-medium">{className} (Đã chọn: 3)</div>

              <div className="mt-2 flex items-center justify-between">
                <Searchbar
                  placeholder="Tìm theo tên học sinh"
                  className="w-[270px]"
                />

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="size-4" />
                    <label htmlFor="" className="text-sm">
                      Chọn tất cả
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="size-4" />
                    <label htmlFor="" className="text-sm">
                      Học sinh đã chọn
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-y-4 rounded-b-md bg-white p-3 pt-5">
              {Students.map((student, key) => (
                <div className="col-span-4" key={key}>
                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="size-4" />
                    <label htmlFor="" className="text-sm">
                      {student.studentName}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

export default ClassroomPopup;
