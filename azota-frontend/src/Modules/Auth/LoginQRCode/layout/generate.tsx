import { LoaderCircle, RefreshCcw, ScanLine } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import AuthAPI from "../../../../API/authAPI";
import { useNavigate } from "react-router";

interface GenerateProps {
  setLayout: React.Dispatch<React.SetStateAction<Number>>;
}

const Generate: React.FC<GenerateProps> = (props) => {
  const navigate = useNavigate();

  const { setLayout } = props;

  const [qrUrl, setQrUrl] = useState();
  const [sessionId, setSessionId] = useState<string>("");

  const fetchLoginQRCode = async () => {
    const response = await AuthAPI.generateLoginQRCode();
    const responseObj = await response.json();
    const { qrUrl, sessionId } = responseObj.data;

    setQrUrl(qrUrl);
    setSessionId(sessionId);
  };

  const fetchQrLoginApproval = async () => {
    try {
      if (sessionId !== "") {
        const response = await AuthAPI.checkLoginQrApproval(sessionId);

        if (!response.ok) return;

        const responseObj = await response.json();
        const { accessToken } = responseObj.data;

        localStorage.setItem("userId", accessToken);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLoginQRCode();
  }, []);

  useEffect(() => {
    fetchQrLoginApproval();

    const intervalId = setInterval(fetchQrLoginApproval, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sessionId]);

  return (
    <Fragment>
      <div className="">Dùng thiết bị cần đăng nhập quét mã bên dưới</div>

      <div className="flex items-center justify-center gap-2">
        <LoaderCircle className="size-4 animate-spin" />
        <div>Đang chờ quét mã Qrcode</div>
      </div>

      {qrUrl ? <img src={qrUrl} alt="QR Code" /> : <p>Đang tải QR code...</p>}

      <div className="mt-4 flex size-24 flex-col items-center justify-center bg-zinc-100 hover:cursor-pointer hover:bg-gray-200">
        <RefreshCcw strokeWidth={1.5} className="size-5" />
        <div className="">Tạo mới mã</div>
      </div>

      <div className="my-4">Hoặc</div>

      <div className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-800 py-2 hover:cursor-pointer hover:bg-blue-50">
        <ScanLine strokeWidth={1.5} className="size-5" />
        <div className="font-medium text-blue-800">Quét mã QR có sẵn</div>
      </div>
    </Fragment>
  );
};

export default Generate;
