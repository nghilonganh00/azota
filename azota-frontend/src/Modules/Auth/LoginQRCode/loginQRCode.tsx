import { RefreshCcw, ScanLine } from "lucide-react";
import { useState } from "react";
import AuthAPI from "../../../API/authAPI";
import { useLocation } from "react-router";
import Main from "./layout/main";
import Generate from "./layout/generate";
import Scan from "./layout/scan";

const LoginQRCode = () => {
  const location = useLocation();

  const [qrUrl, setQrUrl] = useState();
  const [layout, setLayout] = useState<Number>(2);

  return (
    <div className="w-full pt-16">
      <div className="mx-auto flex w-[510px] flex-col items-center rounded-md bg-white px-6 py-4 text-center shadow">
        <div className="text-2xl font-bold text-gray-800">Đăng nhập với mã qr code</div>

        {layout === 0 && <Main setLayout={setLayout} />}
        {layout === 1 && <Generate setLayout={setLayout} />}
        {layout === 2 && <Scan setLayout={setLayout} />}
      </div>
    </div>
  );
};

export default LoginQRCode;
