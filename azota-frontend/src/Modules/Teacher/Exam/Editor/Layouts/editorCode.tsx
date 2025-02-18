import { EllipsisVertical, Plus, Sigma, Upload } from "lucide-react";
import MonacoEditor, { MonacoEditorProps, monaco } from "react-monaco-editor";
import { useRef, useState, useEffect } from "react";
import convertToJSON from "../Utils/formatExam";
import { options } from "../Utils/config";
import AzotaEditor from "../Components/azotaEditor";

interface EditorCodeProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const EditorCode: React.FC<EditorCodeProps> = (props) => {
  const { value, setValue } = props;

  return (
    <div className="col-span-6">
      <div className="border border-gray-200 bg-white shadow-sm">
        <div className="flex border-b border-gray-200">
          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100">
            <Upload className="size-5 text-gray-700" strokeWidth={1.5} />
            <div className="text-[13px]">Upload File</div>
          </div>
          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100">
            <Plus className="size-5 text-gray-700" strokeWidth={1.5} />
            <div className="text-[13px]">Chọn từ ngân hàng cá nhân</div>
          </div>
          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100">
            <Sigma className="size-5 text-gray-700" strokeWidth={1.5} />
            <div className="text-[13px]">Chèn công thức</div>
          </div>
          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100">
            <EllipsisVertical className="size-5 text-gray-700" strokeWidth={1.5} />
          </div>
        </div>

        <AzotaEditor value={value} setValue={setValue} />
      </div>

      <div className="flex gap-1 py-2 text-sm">
        <div className="">Nội dung mẫu:</div>
        <div className="flex items-center gap-1 text-blue-900">
          <div>Mẫu 1</div>
          <div>{" | "}</div>
          <div>Mẫu 2</div>
          <div> | </div>
          <div>Mẫu 3 (Có điền từ)</div>
          <div> | </div>
          <div>Mẫu 4</div>
          <div> | </div>
          <div>Mẫu 5 (Có câu Đúng-Sai)</div>
        </div>
      </div>
    </div>
  );
};

export default EditorCode;
