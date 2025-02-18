import MonacoEditor, { monaco } from "react-monaco-editor";
import { options } from "../Utils/config";

interface AzotaEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const AzotaEditor: React.FC<AzotaEditorProps> = (props) => {
  const { value, setValue } = props;

  const editorDidMount = (editor: any) => {
    editor.focus();
  };

  const handleEditorChange = (value: string) => {
    setValue(value);
    localStorage.setItem("exam", value);
  };

  const editorWillMount = (monaco: any) => {
    if (!monaco.languages.getLanguages().some(({ id }: { id: String }) => id === "azota-editor")) {
      monaco.languages.register({ id: "azota-editor" });

      monaco.languages.setMonarchTokensProvider("azota-editor", {
        tokenizer: {
          root: [
            [/\d/, "mtkb"],
            [/\bCâu \d\b/, "myBlueClass"],
          ],
        },
      });

      monaco.languages.setLanguageConfiguration("azota-editor", {
        comments: {
          lineComment: "//",
          blockComment: ["/*", "*/"],
        },
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"],
        ],
        autoClosingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
        ],
        surroundingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
        ],
      });
    }
  };

  return (
    <MonacoEditor
      height="580"
      options={options}
      language="mysql"
      value={value}
      onChange={handleEditorChange}
      editorDidMount={editorDidMount}
      editorWillMount={editorWillMount}
      className="w-full"
    />
  );
};

export default AzotaEditor;
