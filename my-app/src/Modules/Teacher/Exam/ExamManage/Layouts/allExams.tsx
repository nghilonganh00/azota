import { ChevronsUpDown, FileCheck } from "lucide-react";
import AzotaBankIcon from "../../../../../Assets/icons/azota-bank.svg";
import { ExamConfig } from "../../../../../Globals/Interfaces/interface";
import React from "react";
import ExamRow from "../Components/examRow";

interface AllExamsProps {
  listExamConfig: ExamConfig[];
}

const AllExams: React.FC<AllExamsProps> = (props) => {
  const { listExamConfig } = props;

  return (
    <div className="text-gray-800">
      <div className="mb-4 text-lg font-medium">Tất cả</div>

      <div className="relative min-w-[1100px] overflow-x-auto bg-white pb-8 shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="">
            <tr className="text-gray-600">
              <td scope="col" className="py-3 pl-6">
                <input type="checkbox" className="size-4 text-blue-800" />
              </td>
              <td scope="col" className="py-3">
                <span className="flex">
                  Tên
                  <ChevronsUpDown className="size-5" />
                </span>
              </td>
              <td scope="col" className="px-6 py-3">
                <span className="flex justify-center text-center">
                  Số bài đã nộp
                  <ChevronsUpDown className="size-5" />
                </span>
              </td>
              <td scope="col" className="px-6 py-3">
                <span className="flex text-center">
                  Trạng thái
                  <ChevronsUpDown className="size-5" />
                </span>
              </td>
              <td scope="col" className="px-6 py-3">
                Đã giao cho
              </td>
              <td scope="col" className="px-6 py-3">
                <span className="flex text-center">
                  Sửa lần cuối
                  <ChevronsUpDown className="size-5" />
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <th scope="row" className="px-6 py-4">
                <input type="checkbox" className="size-4" />
              </th>
              <td className="gap-3 py-4">
                <span className="flex items-center gap-3">
                  <img src={AzotaBankIcon} alt="" className="size-6" />
                  <div>Kho đề Azota</div>
                  <div className="rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-bold text-white">
                    Azota
                  </div>
                </span>
              </td>
            </tr>

            {listExamConfig.map((examConfig, key) => (
              <ExamRow key={key} examConfig={examConfig} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExams;