import NumberIcon from "../../../../../Assets/icons/number.svg";

const GenerateStudentID = () => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2.5 shadow-md">
      <img src={NumberIcon} alt="" className="size-4" />
      <div className="text-sm font-semibold">Đánh số báo danh</div>
    </div>
  );
};

export default GenerateStudentID;
