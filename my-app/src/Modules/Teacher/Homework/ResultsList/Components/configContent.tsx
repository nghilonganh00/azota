import { useState, Fragment, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { PencilLine } from "lucide-react";
import { Homework } from "../Interface/interface";
import Popup from "../../../../../Globals/Components/popup";
import { Editor } from "@tinymce/tinymce-react";
import HomeworkAPI from "../../../../../API/homeworkAPI";
import { Homework as HomeworkConfig } from "../../ConfigHomework/interface";

interface ConfigContentProps {
  homework: Homework;
  setHomework: React.Dispatch<React.SetStateAction<Homework>>;
}

const ConfigContent: React.FC<ConfigContentProps> = (props) => {
  const { homework, setHomework } = props;
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(
    homework["Homework"]["homeworkContent"],
  );

  const handleSubmit = async () => {
    console.log("edit content: ", editContent);
    await HomeworkAPI.updateContent(
      homework.Homework.id.toString(),
      editContent,
    );
  };

  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Fragment>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Nội dung</div>
          <div
            className="flex gap-2 rounded-md p-1.5 hover:cursor-pointer hover:bg-gray-200"
            onClick={() => setOpenPopup(true)}
          >
            <PencilLine strokeWidth={1.5} className="size-4 text-blue-800" />
            <div className="text-xs font-semibold text-blue-900">Sửa</div>
          </div>
        </div>

        <div
          className="text-center text-sm"
          dangerouslySetInnerHTML={{
            __html: homework["Homework"]["homeworkContent"],
          }}
        ></div>
      </div>
      <Popup isOpen={openPopup} setOpen={setOpenPopup}>
        <div className="rounded-md bg-white p-3 shadow-sm">
          <div className="mb-2 text-sm font-semibold">Nội dung</div>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="ur0vhjauqc7v03itiycm0yhxvtyspax1lvujfy0s1hv6d2t4"
            init={{
              width: 700,
              height: 300,
              menubar: false,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar_mode: "sliding",
              toolbar:
                "bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request: any, respondWith: any) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant"),
                ),
            }}
            onEditorChange={() =>
              editorRef.current &&
              setEditContent(editorRef.current?.getContent())
            }
            initialValue=""
          />
          <div className="float-right flex items-center gap-2">
            <div
              className="rounded-md bg-gray-200 px-10 py-2 shadow-sm hover:cursor-pointer"
              onClick={() => setOpenPopup(false)}
            >
              <div className="text-sm font-medium text-gray-600">Hủy</div>
            </div>
            <div
              className="rounded-md bg-blue-800 px-10 py-2 shadow-sm hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <div className="text-sm font-semibold text-white">Lưu</div>
            </div>
          </div>
        </div>
      </Popup>
    </Fragment>
  );
};

export default ConfigContent;