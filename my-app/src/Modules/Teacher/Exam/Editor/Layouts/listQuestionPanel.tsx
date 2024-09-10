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
    <div className="col-span-6">
      <div
        className="overflow-y-scroll px-3 py-5"
        style={{ height: "calc(100vh - 80px)" }}
      >
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
