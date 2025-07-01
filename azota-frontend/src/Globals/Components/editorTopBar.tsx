import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu/menu";
import { LuBell } from "react-icons/lu";
import { X } from "lucide-react";
import convertToJSON from "../../Modules/Teacher/Exam/Editor/Utils/formatExam";
import { useNotification } from "../Context/NotificationContext";

// Constants
const LOGO_URL = "https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/images/logo.svg";
const FLAG_URL = "https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/flag/vi.svg";
const EDITOR_PATH = "/teacher/exam/editor";
const CREATE_PATH = "/teacher/exam/editor/create";

// Error messages
const ERROR_MESSAGES = {
  EMPTY_EXAM_NAME: "Vui lòng nhập tên bài thi!",
  MISSING_ANSWERS: "Vui lòng nhập đầy đủ đáp án cho tất cả câu hỏi!",
} as const;

// Types
interface ExamPart {
  questions?: Record<
    string,
    {
      options: Record<string, { isCorrect: boolean }>;
    }
  >;
}

interface ExamJSON {
  [key: string]: ExamPart;
}

const EditorTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotification();

  const [examName, setExamName] = useState("");
  const [openExamNameInput, setOpenExamNameInput] = useState(true);

  // Memoized exam data
  const examJSON: ExamJSON | null = convertToJSON(localStorage.getItem("exam") || "");

  // Validation function
  const validateExamAnswers = useCallback((exam: ExamJSON): boolean => {
    return Object.values(exam).every((part) => {
      if (!part.questions) return true;

      return Object.values(part.questions).every((question) =>
        Object.values(question.options).some((option) => option.isCorrect),
      );
    });
  }, []);

  // Event handlers
  const handleExamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamName(e.target.value);
  };

  const handleCancel = () => {
    setExamName("");
  };

  const handleContinue = useCallback(() => {
    // Validate exam name
    if (!examName.trim()) {
      addNotification(ERROR_MESSAGES.EMPTY_EXAM_NAME, "WARNING");
      return;
    }

    // Validate exam answers
    if (examJSON && !validateExamAnswers(examJSON)) {
      addNotification(ERROR_MESSAGES.MISSING_ANSWERS, "WARNING");
      return;
    }

    localStorage.setItem("exam_config", examName);
    navigate(CREATE_PATH);
  }, [examName, examJSON, navigate, validateExamAnswers, addNotification]);

  // Effects
  useEffect(() => {
    setOpenExamNameInput(location.pathname === EDITOR_PATH);
  }, [location.pathname]);

  // Render functions
  const renderLogo = () => (
    <div className="col-span-2">
      <Link to="/" className="hover:cursor-pointer">
        <img width="95" src={LOGO_URL} alt="Azota Logo" className="h-auto" />
      </Link>
    </div>
  );

  const renderExamNameInput = () => (
    <div className="col-span-6">
      {openExamNameInput && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nhập tên ..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 dark:focus:border-blue-400"
            value={examName}
            onChange={handleExamNameChange}
          />

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-300 dark:bg-darkmode-400 dark:text-slate-300 dark:hover:bg-darkmode-300"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="rounded-md bg-blue-800 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Tiếp tục
          </button>
        </div>
      )}
    </div>
  );

  const renderActions = () => (
    <div className="col-span-4">
      <div className="flex items-center justify-end gap-5 pr-2">
        <img src={FLAG_URL} alt="Vietnamese Flag" className="h-5 w-auto" />
        <LuBell className="size-5 text-slate-600 dark:text-slate-400" />
        <Menu />
      </div>
    </div>
  );

  return (
    <>
      <header className="w-full border-b border-slate-200 bg-white px-3 py-4 dark:border-darkmode-400 dark:bg-darkmode-600">
        <div className="grid grid-cols-12">
          {renderLogo()}
          {renderExamNameInput()}
          {renderActions()}
        </div>
      </header>
    </>
  );
};

export default EditorTopBar;
