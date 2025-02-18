import { RefreshCcw, ScanLine } from "lucide-react";
import { Fragment } from "react";

interface MainProps {
  setLayout: React.Dispatch<React.SetStateAction<Number>>;
}

const Main: React.FC<MainProps> = (props) => {
  const { setLayout } = props;

  return (
    <Fragment>
      <div className="">
        Để đăng nhập lên thiết bị này, vui lòng tạo mã để thiết bị đã đăng nhập quét.
      </div>

      <div
        className="mt-4 flex size-24 flex-col items-center justify-center bg-zinc-100 hover:cursor-pointer hover:bg-gray-200"
        onClick={() => setLayout(1)}
      >
        <RefreshCcw strokeWidth={1.5} className="size-5" />
        <div className="">Tạo mới mã</div>
      </div>

      <div className="my-4">Hoặc</div>

      <div
        className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-800 py-2 hover:cursor-pointer hover:bg-blue-50"
        onClick={() => setLayout(2)}
      >
        <ScanLine strokeWidth={1.5} className="size-5" />
        <div className="font-medium text-blue-800">Quét mã QR có sẵn</div>
      </div>
    </Fragment>
  );
};

export default Main;
