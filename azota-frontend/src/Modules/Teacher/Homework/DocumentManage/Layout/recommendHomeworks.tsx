import { Homework } from "../../../../../Globals/Interfaces/homework.interface";
import HomeworkBox from "../Components/HomeworkBox";

interface RecommendHomeworksProps {
  className?: string;
  listHomework: Homework[];
}

const RecommendHomeworks: React.FC<RecommendHomeworksProps> = (props) => {
  const { className, listHomework } = props;

  return (
    <div className={`${className}`}>
      <div className="mb-4 text-lg font-semibold">Được đề xuất</div>

      <div className="grid grid-cols-12 gap-6">
        {listHomework?.map((homework) => {
          return <HomeworkBox homework={homework} key={homework.id} />;
        })}
      </div>
    </div>
  );
};

export default RecommendHomeworks;
