import { QRCodeCanvas } from "qrcode.react";

interface QRCodeGeneratorProps {
  text: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = (props) => {
  const { text, size } = props;

  return (
    <div>
      <QRCodeCanvas value={text} size={size}></QRCodeCanvas>
    </div>
  );
};

export default QRCodeGenerator;
