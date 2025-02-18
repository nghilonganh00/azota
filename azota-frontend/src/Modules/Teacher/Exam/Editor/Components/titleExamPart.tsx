interface TitleExamPartProps {
  partTitle: string;
}

const TitleExamPart: React.FC<TitleExamPartProps> = (props) => {
  const { partTitle } = props;

  return (
    <div className="w-full rounded-md border border-gray-400 bg-white px-7 py-5">
      <div className="flex items-center justify-between">
        <div className="rounded-md border border-gray-300 px-2 py-1">
          <div className="text-sm font-semibold">Tiêu đề nhóm</div>
        </div>

        <div className="text-sm text-blue-700">Cố định câu hỏi trong nhóm</div>
      </div>

      <div className="mt-2 rounded-sm border border-gray-300 p-1">
        <div className="text-sm">{partTitle}</div>
      </div>
    </div>
  );
};

export default TitleExamPart;
