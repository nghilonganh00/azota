import { Upload } from "lucide-react";
import { useRef } from "react";


interface UploadFileButtonProps {
  onUpload: (file: File) => void;
}

const UploadFileButton: React.FC<UploadFileButtonProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // If it's a .docx file, extract text using mammoth
      if (file.name.endsWith(".docx")) {
        try {
          // @ts-ignore
          const mammoth = await import("mammoth");
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          onUpload(new File([result.value], file.name + ".txt", { type: "text/plain" }));
        } catch (err) {
          alert("Failed to read Word file. Please try again.");
        }
      } else {
        onUpload(file);
      }
      e.target.value = ""; // reset input
    }
  };

  return (
    <div
      className="flex items-center gap-2 border-r border-gray-200 p-2.5 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-darkmode-100"
      onClick={handleClick}
    >
      <Upload className="size-5 text-gray-700 dark:text-slate-300" strokeWidth={1.5} />
      <div className="text-[13px]">Upload File</div>
      <input ref={inputRef} type="file" accept=".txt,.docx" style={{ display: "none" }} onChange={handleChange} />
    </div>
  );
};

export default UploadFileButton;
