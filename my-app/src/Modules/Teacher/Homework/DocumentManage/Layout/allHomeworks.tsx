import { ClassWithHomework } from "../Interface/interface";
import HomeworkBox from "../Components/HomeworkBox";
import ExerciseBox from "../Components/HomeworkBox";

interface AllHomeworksProps {
  data: ClassWithHomework[];
}

interface ClassBoxProps {
  data: ClassWithHomework;
}

const ClassBox: React.FC<ClassBoxProps> = (props) => {
  const { data } = props;
  const {
    id,
    className,
    classYear,
    teacherId,
    classGroupId,
    createdAt,
    updatedAt,
    Assignments,
  } = data;

  console.log(data);

  return (
    <div className="col-span-4 rounded-md bg-white px-3 shadow-sm">
      <div className="flex items-center justify-between border-b border-solid py-4">
        <div className="text-sm font-semibold text-slate-800">{className}</div>
        <div className="text-sm font-semibold text-blue-900 hover:cursor-pointer hover:text-blue-800">
          Xem tất cả
        </div>
      </div>

      <div className="space-y-3 py-4">
        {Assignments?.map((homework, key) => (
          <HomeworkBox data={homework} key={key} />
        ))}
      </div>
    </div>
  );
};

const AllHomeworks: React.FC<AllHomeworksProps> = (props) => {
  const { data } = props;
  console.log("data: ", data);
  return (
    <div>
      <div className="text-lg font-semibold">Tất cả</div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        {data?.map((item, key) => <ClassBox data={item} key={key} />)}
      </div>
    </div>
  );
};

export default AllHomeworks;
