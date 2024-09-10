interface ActionsProps {
  onPublish: () => void;
}

const Actions: React.FC<ActionsProps> = (props) => {
  const { onPublish } = props;

  return (
    <div className="float-right mt-6 flex items-center gap-2 pb-20">
      <div className="rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
        Lưu nháp
      </div>
      <div
        onClick={onPublish}
        className="rounded-md bg-blue-900 px-4 py-2.5 shadow-sm hover:cursor-pointer"
      >
        <div className="text-sm font-semibold text-white">Xuất bản</div>
      </div>
    </div>
  );
};

export default Actions;
