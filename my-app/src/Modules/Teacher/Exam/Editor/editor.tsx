import { useEffect, useRef, useState } from "react";
import EditorCode from "./Layouts/editorCode";
import convertToJSON from "./Utils/formatExam";
import ListQuestionPanel from "./Layouts/listQuestionPanel";

const Editor = () => {
  const savedEditorValue = localStorage.getItem("exam") ?? "";
  const [editorValue, setEditorValue] = useState(savedEditorValue);
  const [examJSON, setExamJSON] = useState<{ [key: string]: any }>();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  //Covert text in the Editor from string to JSON
  const handleCovertEditorIntoJSON = () => {
    const covertedExamJSON = convertToJSON(editorValue);
    setExamJSON(covertedExamJSON);
    localStorage.setItem("exam", editorValue);
  };

  //After 3 seconds the user cannot edit in the EditorCode, the conversion function will be performed
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleCovertEditorIntoJSON();
    }, 2000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [editorValue]);

  console.log("exam: ", examJSON);

  return (
    <div className="grid grid-cols-12">
      <ListQuestionPanel examJSON={examJSON} setExamJSON={setExamJSON} />

      <EditorCode value={editorValue} setValue={setEditorValue} />
    </div>
  );
};

export default Editor;
