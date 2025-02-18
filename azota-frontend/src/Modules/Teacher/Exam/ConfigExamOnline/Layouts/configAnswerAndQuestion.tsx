import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ConfigAnswerAndQuestionProps {
  examConfig: Exam;
  setExamConfig: React.Dispatch<React.SetStateAction<Exam>>;
  handleChangeConfig: (name: string, newValue: string) => void;
}

const ConfigAnswerAndQuestion: React.FC<ConfigAnswerAndQuestionProps> = (props) => {
  const { examConfig, setExamConfig, handleChangeConfig } = props;

  const { showAnswer, showResult } = examConfig;

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow">
      <div className="border-b border-gray-200 pb-4 text-base font-medium">Điểm và đáp án khi làm xong</div>

      <div className="mt-4 space-y-5">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="text-sm font-medium">Cho xem điểm</div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="score-no"
                  name="config-show-score"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showResult", "NO")}
                  defaultChecked={showResult === "NO"}
                />
                <label className="text-sm" htmlFor="score-no">
                  Không
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="score-finish"
                  name="config-show-score"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showResult", "SUBMITTED")}
                  defaultChecked={showResult === "SUBMITTED"}
                />
                <label className="text-sm" htmlFor="score-finish">
                  Khi làm bài xong
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="score-all-finish"
                  name="config-show-score"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showResult", "ALL_SUBMITTED")}
                  defaultChecked={showResult === "ALL_SUBMITTED"}
                />
                <label className="text-sm" htmlFor="score-all-finish">
                  Khi tất cả thi xong
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="text-sm font-medium">Cho xem đề thi và đáp án</div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="answer-no"
                  name="config-answer"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showAnswer", "NO")}
                  defaultChecked={showAnswer === "NO"}
                />
                <label className="text-sm" htmlFor="answer-no">
                  Không
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="config-answer"
                  id="answer-finish"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showAnswer", "SUBMITTED")}
                  defaultChecked={showAnswer === "SUBMITTED"}
                />
                <label className="text-sm" htmlFor="answer-finish">
                  Khi làm bài xong
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="config-answer"
                  id="answer-all-finish"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showAnswer", "ALL_SUBMITTED")}
                  defaultChecked={showAnswer === "ALL_SUBMITTED"}
                />
                <label className="text-sm" htmlFor="answer-all-finish">
                  Khi tất cả thi xong
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="config-answer"
                  id="exam-pass"
                  className="h-4 w-4 border-gray-300 accent-blue-600"
                  onChange={() => handleChangeConfig("showAnswer", "REACHED_POINT")}
                  defaultChecked={showAnswer === "REACHED_POINT"}
                />
                <label className="text-sm" htmlFor="exam-pass">
                  Khi đạt đến số điểm nhất định
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAnswerAndQuestion;
