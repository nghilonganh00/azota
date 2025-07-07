import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Plus, X } from "lucide-react";
import { NewHomework } from "../libs/interfaces";
import { useNotification } from "../../../../../Globals/Context/NotificationContext";

interface ConfigContentProps {
  values: NewHomework;
  onChangeText: (name: string, newValue: string) => void;
  onChangeFile: (name: string, newValue: File[]) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ConfigContent: React.FC<ConfigContentProps> = (props) => {
  const { addNotification } = useNotification();

  const { values, onChangeText, onChangeFile } = props;

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const files = (e.target as HTMLInputElement).files;

    if (files) {
      console.log("files: ", files);

      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      Array.from(files).forEach((file) => {
        if (file.size <= MAX_FILE_SIZE) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      });

      if (validFiles.length > 0) {
        onChangeFile("homeworkFiles", [...values["homeworkFiles"], ...validFiles]);
      }

      if (invalidFiles.length > 0) {
        addNotification(`Dung lượng file được không lớn hơn 5MB: ${invalidFiles.join(", ")}`, "ERROR");
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = values["homeworkFiles"].filter((_, i) => i !== index);
    onChangeFile("homeworkFiles", newFiles);
  };

  useEffect(() => {
    if (editorRef.current) onChangeText("content", editorRef.current?.getContent());
  }, [editorRef.current?.getContent()]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <span className="mb-2 flex text-sm font-medium">Nội dung</span>
      </div>

      <div className="col-span-12">
        <label className="inline-flex items-center gap-2 rounded-md border-blue-700 bg-blue-900/20 p-2 text-blue-900 hover:cursor-pointer dark:border dark:bg-blue-900/40 dark:text-blue-700">
          <Plus className="size-4" />
          <div className="text-xs font-semibold">Thêm file bài tập</div>
          <input type="file" className="hidden" onChange={handleAddFile} />
        </label>
      </div>

      <div className="col-span-12">
        <div className="py-2 text-xs text-gray-700 dark:text-gray-300">
          Chụp ảnh bài tập hoặc chọn file ảnh, pdf, word, excel, audio và video
        </div>
      </div>

      <div className="col-span-12">
        <div className="space-y-2">
          {values["homeworkFiles"].map((file: File, index) => (
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300" key={index}>
              <X strokeWidth={1.5} className="size-4 cursor-pointer" onClick={() => handleRemoveFile(index)} />
              <div className="text-sm">{file.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12">
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
            ai_request: (request: any, respondWith: any) =>
              respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            content_style: "body { background-color: #f0f8ff; color: #333; }",
          }}
          onEditorChange={() => editorRef.current && onChangeText("homeworkContent", editorRef.current?.getContent())}
          initialValue=""
        />
      </div>
    </div>
  );
};

export default ConfigContent;
