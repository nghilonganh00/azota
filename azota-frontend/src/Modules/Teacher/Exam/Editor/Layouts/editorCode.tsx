import { EllipsisVertical, Plus, Sigma, Upload } from "lucide-react";
import { useRef } from "react";
import AzotaEditor, { AzotaEditorHandle } from "../Components/azotaEditor";
import UploadFileButton from "../Components/UploadFileButton";
import ExamSampleSelector from "../Components/ExamSampleSelector";

interface EditorCodeProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  goToLine: number;
}

const EditorCode: React.FC<EditorCodeProps> = (props) => {
  const { value, setValue, goToLine } = props;
  const azotaEditorRef = useRef<AzotaEditorHandle>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (azotaEditorRef.current) {
        azotaEditorRef.current.insertTextAtCursor(content);
      }
    };
    reader.readAsText(file);
  };

  const handleSelectSample = (sampleContent: string) => {
    setValue(sampleContent);
  };

  return (
    <div className="col-span-6">
      <div className="border border-gray-200 bg-white shadow-sm dark:bg-darkmode-600">
        <div className="flex border-b border-gray-200 dark:text-slate-300">
          <UploadFileButton onUpload={handleUpload} />

          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-darkmode-100">
            <Plus className="size-5 text-gray-700 dark:text-slate-300" strokeWidth={1.5} />
            <div className="text-[13px]">Chọn từ ngân hàng cá nhân</div>
          </div>
          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-darkmode-100">
            <Sigma className="size-5 text-gray-700 dark:text-slate-300" strokeWidth={1.5} />
            <div className="text-[13px]">Chèn công thức</div>
          </div>
          <div className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-darkmode-100">
            <EllipsisVertical className="size-5 text-gray-700 dark:text-slate-300" strokeWidth={1.5} />
          </div>
        </div>

        <AzotaEditor ref={azotaEditorRef} value={value} setValue={setValue} goToLine={goToLine} />
      </div>

      <ExamSampleSelector handleSelectSample={handleSelectSample} />
    </div>
  );
};

export default EditorCode;
