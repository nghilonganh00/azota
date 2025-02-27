interface TitleExamPartProps {
  partTitle: string;
}

const TitleExamPart: React.FC<TitleExamPartProps> = (props) => {
  const { partTitle } = props;

  return (
    <div className="w-full rounded-md border border-gray-400 bg-white px-7 py-5 dark:bg-darkmode-600 dark:text-slate-300">
      <div className="flex items-center justify-between">
        <div className="rounded-md border border-gray-300 px-2 py-1">
          <div className="text-sm font-semibold">Tiêu đề nhóm</div>
        </div>

        <div className="text-sm text-blue-700 dark:text-blue-600">Cố định câu hỏi trong nhóm</div>
      </div>

      <div className="mt-2 rounded-sm border border-gray-300 p-1">
        <div className="text-sm">{partTitle}</div>
      </div>
    </div>
  );
};

export default TitleExamPart;
