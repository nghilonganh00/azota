import { ArrowDownUp, CircleAlert, SquareDivide } from "lucide-react";
import QuestionBox from "../Components/questionBox";
import TitleExamPart from "../Components/titleExamPart";
import { Fragment } from "react";

interface ListQuestionPanelProps {
  examJSON: any;
  setExamJSON: React.Dispatch<React.SetStateAction<any>>;
}

const ListQuestionPanel: React.FC<ListQuestionPanelProps> = (props) => {
  const { examJSON, setExamJSON } = props;

  return (
    <div className="relative col-span-6">
      <div className="flex items-center justify-end gap-2 bg-white px-2 dark:bg-darkmode-600 dark:text-slate-300">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-md border-x border-slate-300 bg-blue-800 px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-blue-700"
        >
          <SquareDivide strokeWidth={1.6} className="size-4 text-white" />
          <div className="text-xs font-medium text-white">Chia điểm</div>
        </button>

        <div className="flex items-center justify-center gap-2 border-x border-slate-300 px-1 py-2.5">
          <CircleAlert strokeWidth={1.6} className="size-4 text-gray-800 dark:text-slate-300" />
          <div className="text-[13px] text-gray-900 dark:text-slate-300">Thông tin đề</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <ArrowDownUp strokeWidth={1.6} className="size-5 text-gray-900 dark:text-slate-300" />

          <div className="text-[13px] text-gray-900 dark:text-slate-300">Đi đến đâu</div>

          <input
            type="text"
            className="h-7 w-[60px] rounded border border-gray-300 px-3 py-2 text-sm"
            defaultValue={1}
          />

          <div className="flex items-center justify-center gap-1 rounded-md bg-blue-800 px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-blue-700">
            <div className="text-xs font-semibold text-white">Đến</div>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll px-3 py-5" style={{ height: "calc(100vh - 80px)" }}>
        <div className="space-y-3">
          {examJSON &&
            Object.keys(examJSON).map((partKey) => {
              const { title, questions } = examJSON[partKey];

              return (
                <Fragment key={partKey}>
                  <TitleExamPart partTitle={title} />

                  {Object.keys(questions).map((questionKey, key) => (
                    <QuestionBox
                      key={questionKey}
                      partKey={partKey}
                      questionKey={questionKey}
                      examJSON={examJSON}
                      setExamJSON={setExamJSON}
                    />
                  ))}
                </Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ListQuestionPanel;
