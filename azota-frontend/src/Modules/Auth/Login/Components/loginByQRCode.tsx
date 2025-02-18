import { QrCode } from "lucide-react";
import { useNavigate } from "react-router";

const LoginByQRCode = () => {
  const navigate = useNavigate();

  const handleRedirectToQrCodePage = () => {
    navigate("/auth/login-qrcode");
  };

  return (
    <div
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 shadow-sm hover:cursor-pointer"
      onClick={handleRedirectToQrCodePage}
    >
      <QrCode className="size-4 text-gray-600" />
      <div className="text-sm font-medium text-gray-600">Qrcode</div>
    </div>
  );
};

export default LoginByQRCode;
