import { QrCode } from "lucide-react";
import { useNavigate } from "react-router";

const LoginByQRCode = () => {
  const navigate = useNavigate();

  const handleRedirectToQrCodePage = () => {
    navigate("/auth/login-qrcode");
  };

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 text-gray-600 shadow-sm hover:cursor-pointer dark:border-darkmode-400 dark:text-slate-300"
      onClick={handleRedirectToQrCodePage}
    >
      <QrCode className="size-4" />
      <div className="text-sm font-medium">Qrcode</div>
    </button>
  );
};

export default LoginByQRCode;
