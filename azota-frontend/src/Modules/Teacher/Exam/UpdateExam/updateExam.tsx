import { CircleX, Ellipsis, FilePen, Tags, Trash, Trash2 } from "lucide-react";
import QuestionBox from "./Components/questionBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ExamAPI from "../../../../API/examAPI";
import { Exam } from "./libs/interface";
import { GroupedQuestionPart } from "../ExamReview/libs/interface";
import { groupQuestionsByPart } from "../ExamReview/libs/utils";

const UpdateExam = () => {
  const { hashId } = useParams();

  const [exam, setExam] = useState<Exam>();
  const [parts, setParts] = useState<GroupedQuestionPart[]>();

  useEffect(() => {
    const fetchExamData = async () => {
      if (hashId) {
        // const data = await ExamAPI.getDetailByHashId(hashId);
        // const questionParts: GroupedQuestionPart[] = groupQuestionsByPart(data.Questions);
        // setExam(data);
        // setParts(questionParts);
      }
    };

    fetchExamData();
  }, [hashId]);

  console.log("exam: ", parts);
  return (
    <div className="mx-auto my-6 w-10/12 space-y-6">
      <div className="flex gap-2">
        <div className="flex-1 rounded-md border border-gray-200 bg-white py-2 text-center shadow-sm">
          <div className="text-sm font-medium">{exam?.examName}</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white px-5 py-2 shadow-sm">
          <div className="text-sm font-medium">Hủy</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-blue-800 px-5 py-2 shadow-sm">
          <div className="text-sm font-medium text-white">Lưu</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white px-1.5 py-2 shadow-sm">
          <Ellipsis className="w-4" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1 shadow-sm">
          <div className="text-sm font-medium">Đi đến câu thứ</div>
          <input type="text" className="w-20 rounded-md border border-gray-300 p-1.5 shadow-sm" />
          <div className="rounded-md border border-gray-200 bg-[#2361ae] px-3 py-2 shadow-sm">
            <div className="text-sm font-medium text-white">Đến</div>
          </div>
        </div>
        <div className="rounded-md bg-[#2361ae] px-3 py-2 shadow-sm">
          <div className="text-sm font-medium text-white">Chia điểm</div>
        </div>
      </div>

      <div className="space-y-10">
        {parts?.map((part, key) => {
          const { questionPartName, questions } = part;

          return (
            <div key={key}>
              <div className="relative rounded-md bg-white pb-4 pl-4 pt-8 shadow-sm">
                <div className="text-sm font-bold text-gray-800">{questionPartName}</div>

                <div className="absolute right-2 top-2 rounded-md border border-gray-300 px-1.5 py-1 shadow-sm">
                  <FilePen className="size-4" strokeWidth={1.5} />
                </div>
              </div>

              <div className="mt-10 space-y-10">
                {questions.map((question, key) => (
                  <QuestionBox key={key} question={question} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpdateExam;
