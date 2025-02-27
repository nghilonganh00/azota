import { Editor } from "@tinymce/tinymce-react";
import Toggle from "../../../../../Globals/Components/Toggle/toggle";
import { useState, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ConfigOtherProps {
  examConfig: Exam;
  setExamConfig: React.Dispatch<React.SetStateAction<Exam>>;
  handleChangeConfig: (name: string, newValue: string) => void;
}

const ConfigOther: React.FC<ConfigOtherProps> = (props) => {
  const { examConfig, setExamConfig, handleChangeConfig } = props;
  const { header } = examConfig;
  const [openHeader, setOpenHeader] = useState<boolean>(header !== "");
  const [examHeader, setExamHeader] = useState(header || "");

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleEditorChange = (content: string) => {
    setExamHeader(content);
    handleChangeConfig("header", content);
  };

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow dark:bg-darkmode-600 dark:text-slate-300">
      <div className="border-b border-gray-200 pb-4 text-base font-medium dark:border-darkmode-400">Khác</div>

      <div className="my-3 grid grid-cols-12">
        <div className="col-span-5">
          <div>
            <div className="font-medium">Thêm thông tin tiêu đề</div>
            <div className="mt-2 text-xs/5 text-slate-500">
              Hệ thống sẽ thêm thông tin này lên phần tiêu đề của đề thi khi học sinh vào thi.
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Toggle isOpen={openHeader} setOpen={setOpenHeader} />
        </div>
      </div>

      {openHeader && (
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="ur0vhjauqc7v03itiycm0yhxvtyspax1lvujfy0s1hv6d2t4"
          init={{
            height: 300,
            menubar: false,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
            toolbar_mode: "sliding",
            toolbar:
              "blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request: any, respondWith: any) =>
              respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          onEditorChange={handleEditorChange}
          initialValue={examHeader}
        />
      )}
    </div>
  );
};

export default ConfigOther;
