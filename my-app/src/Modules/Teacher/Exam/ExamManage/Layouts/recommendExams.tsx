import { ExamConfig } from "../../../../../Globals/Interfaces/interface";
import ExamBox from "../Components/examBox";
import { ExamPreview } from "../libs/interface";

interface RecommendExamsProps {
  className?: string;
  listExamPrevies: ExamPreview[];
}

const RecommendExams: React.FC<RecommendExamsProps> = (props) => {
  const { className, listExamPrevies } = props;

  return (
    <div className="">
      <div className="mb-4 text-lg font-medium text-gray-800">Được đề xuất</div>

      <div className="grid grid-cols-12 gap-6">
        {listExamPrevies?.map((examPreview, key) => (
          <ExamBox examPreview={examPreview} key={key} />
        ))}
      </div>
    </div>
  );
};

export default RecommendExams;