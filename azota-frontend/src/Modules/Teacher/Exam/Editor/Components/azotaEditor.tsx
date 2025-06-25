import MonacoEditor, { monaco } from "react-monaco-editor";
import { options } from "../Utils/config";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface AzotaEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  goToLine?: number;
}

export interface AzotaEditorHandle {
  insertTextAtCursor: (text: string) => void;
}

const AzotaEditor = forwardRef<AzotaEditorHandle, AzotaEditorProps>((props, ref) => {
  const { value, setValue, goToLine } = props;
  const editorRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    insertTextAtCursor: (text: string) => {
      if (editorRef.current) {
        const editor = editorRef.current;
        const selection = editor.getSelection();
        const id = { major: 1, minor: 1 };
        editor.executeEdits(id, [
          {
            range: selection,
            text,
            forceMoveMarkers: true,
          },
        ]);
        editor.focus();
      }
    },
  }));

  const editorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
    if (goToLine) {
      editor.revealLineInCenter(goToLine);
      editor.setPosition({ lineNumber: goToLine, column: 1 });
    }
  };

  useEffect(() => {
    if (goToLine && editorRef.current) {
      editorRef.current.revealLineInCenter(goToLine);
      editorRef.current.setPosition({ lineNumber: goToLine, column: 1 });
      editorRef.current.focus();
    }
  }, [goToLine]);

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
      height="560"
      options={options}
      language="mysql"
      value={value}
      onChange={handleEditorChange}
      editorDidMount={editorDidMount}
      editorWillMount={editorWillMount}
      className="w-full dark:bg-darkmode-600"
    />
  );
});

export default AzotaEditor;
