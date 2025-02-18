import { MonacoEditorProps } from "react-monaco-editor";

export const options: MonacoEditorProps["options"] = {
  autoIndent: "full",
  contextmenu: true,
  // fontFamily: "monospace",
  // fontSize: 13,
  // lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  minimap: {
    enabled: false,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 8,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: true,
  wordWrap: "on",
  wrappingIndent: "same",
};
