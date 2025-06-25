import QuestionBox from "../Components/questionBox";
import TitleExamPart from "../Components/titleExamPart";
import { Fragment, useState } from "react";
import SetPointsButton from "../Components/SetPointsButton";
import ExamInformationButton from "../Components/ExamInformationButton";
import GoToQuestionButton from "../Components/GoToQuestionButton";

interface ListQuestionPanelProps {
  examJSON: any;
  setExamJSON: React.Dispatch<React.SetStateAction<any>>;
  handleGoToLine: (line: number) => void;
}

const ListQuestionPanel: React.FC<ListQuestionPanelProps> = (props) => {
  const { examJSON, setExamJSON, handleGoToLine } = props;
  const [goToQuestion, setGoToQuestion] = useState<number>(1);

  const handleGoToQuestion = () => {
    const el = document.getElementById(`question-${goToQuestion}`);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative col-span-6">
      <div className="flex items-center justify-end gap-2 bg-white px-2 dark:bg-darkmode-600 dark:text-slate-300">
        <SetPointsButton examJSON={examJSON} setExamJSON={setExamJSON} />

        <ExamInformationButton examJSON={examJSON} />

        <GoToQuestionButton
          goToQuestion={goToQuestion}
          setGoToQuestion={setGoToQuestion}
          handleGoToQuestion={handleGoToQuestion}
        />
      </div>

      <div className="overflow-y-scroll px-3 py-5" style={{ height: "calc(100vh - 80px)" }}>
        <div className="space-y-3">
          {examJSON &&
            Object.keys(examJSON).map((partKey) => {
              const { title, questions, rawIndex: partIndex, line } = examJSON[partKey];

              return (
                <Fragment key={partKey}>
                  <TitleExamPart partTitle={title} handleGoToLine={() => handleGoToLine(line)} />

                  {Object.keys(questions).map((questionKey) => {
                    const { rawIndex: questionIndex, line } = questions[questionKey];

                    return (
                      <QuestionBox
                        key={questionKey}
                        partKey={partKey}
                        questionKey={questionKey}
                        examJSON={examJSON}
                        setExamJSON={setExamJSON}
                        handleGoToLine={() => handleGoToLine(line)}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ListQuestionPanel;
