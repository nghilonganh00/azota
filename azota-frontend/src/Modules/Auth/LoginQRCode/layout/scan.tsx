import { ChevronLeft, LoaderCircle, RefreshCcw, ScanLine, Upload } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import AuthAPI from "../../../../API/authAPI";
import jsQR from "jsqr";
// import QrScanner from "react-qr-scanner";

interface ScanProps {
  setLayout: React.Dispatch<React.SetStateAction<Number>>;
}

const Scan: React.FC<ScanProps> = (props) => {
  const { setLayout } = props;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];

    if (uploadFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              await handleLogin(code.data);
            } else {
              console.error("No QR code found in the image");
            }
          }
        };
      };
      reader.readAsDataURL(uploadFile);

      event.target.value = "";
    }
  };

  const handleLogin = async (sessionId: string) => {
    console.log("sessionId: ", sessionId);
    const response = await AuthAPI.approveLoginQrCode(sessionId);
    console.log("login by qr response: ", response);
  };

  return (
    <Fragment>
      <div>Để đăng nhập lên thiết bị này, vui lòng tạo mã để thiết bị đã đăng nhập quét.</div>

      <div>Di chuyển camera tới mã qrcode đăng nhập ( Hướng dẫn)</div>

      <div className="mt-8"></div>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className=""
          id="up-qr-code"
        />
        <div className="flex items-center justify-center" id="up-qr-code">
          <Upload />
          <div>Tải lên mã có sẵn</div>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div
          className="float-left flex items-center justify-center gap-2 text-blue-700 hover:cursor-pointer"
          onClick={() => setLayout(0)}
        >
          <ChevronLeft strokeWidth={1.5} className="size-4" />
          <div>Quay lại</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Scan;
