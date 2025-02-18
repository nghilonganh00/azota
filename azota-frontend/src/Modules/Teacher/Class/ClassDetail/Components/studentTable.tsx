import { ChevronDown, Trash2 } from "lucide-react";
import StudentAvatar from "../../../Homework/ResultsList/Components/avatar";
import EditStudent from "./editStudent";
import { StudentClass } from "../../../../../Globals/Interfaces/info.interface";

interface StudentTableProps {
  homeworkTotal: number;
  listStudent: StudentClass[];
}

const StudentTable: React.FC<StudentTableProps> = (props) => {
  const { homeworkTotal, listStudent } = props;
  console.log(`listStudent: ${listStudent}`);

  return (
    <table className="w-full border-separate border-spacing-x-0 border-spacing-y-3 text-sm">
      <thead className="">
        <tr className="bg-white">
          <th className="p-2">
            <input type="checkbox" />
          </th>
          <th>
            <div className="text-center font-semibold">{`Sĩ số: ${listStudent.length}`}</div>
          </th>
          <th>
            <div className="pl-6 text-left font-semibold">Họ và tên</div>
          </th>
          <th>
            <div className="font-semibold">Số báo danh</div>
          </th>
          <th>
            <div className="font-semibold">Bài tập đã làm</div>
          </th>
          <th>
            <div className="font-semibold">Đề thi đã làm</div>
          </th>
          <th>
            <div className="font-semibold">Hành động</div>
          </th>
        </tr>
      </thead>

      <tbody>
        {listStudent?.map((studentClass, key) => (
          <tr className="rounded-md bg-white text-center" key={studentClass.id}>
            <td className="py-6">
              <input type="checkbox" className="size-4" />
            </td>

            <td>
              <div className="flex flex-col items-center border-r border-gray-300">
                <input
                  value={key + 1}
                  type="text"
                  className="w-12 rounded-md px-2 py-1 text-center text-sm font-normal shadow"
                />
                <ChevronDown className="mt-1 size-5" />
              </div>
            </td>

            <td className="pl-5">
              <div className="flex items-center gap-2">
                <div className="scale-90">
                  <StudentAvatar fullname={"Lê Văn Thiện"} />
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-900">{studentClass.fullname}</div>

                  <span
                    className={
                      "material-symbols-outlined text-lg " + (studentClass.gender ? "text-[#0000ff]" : "text-[#fe00a1]")
                    }
                  >
                    {studentClass.gender ? "male" : "female"}
                  </span>
                </div>
              </div>
            </td>

            <td>
              <div>{studentClass?.identificationNumber || ""}</div>
            </td>

            <td>
              <div>{`${studentClass?.homeworkResults?.length || 0} / ${homeworkTotal} bài tập`}</div>
            </td>

            <th></th>

            <td>
              <div className="flex items-center justify-center gap-3">
                <EditStudent studentClass={studentClass} />

                <div className="flex items-center gap-2 rounded-md border border-red-500 px-2 py-1.5 text-red-500">
                  <Trash2 className="size-4" />
                  <div className="text-xs font-semibold">Xóa</div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
