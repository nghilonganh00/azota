import { ReactNode } from "react";
import { usePopup } from "./Popup/popup";

interface CopyBoxProps {
  copyText: string;
  children: ReactNode;
}
const CopyBox: React.FC<CopyBoxProps> = (props) => {
  const { copyText, children } = props;
  const { handleNotify, Popup } = usePopup();

  const handleCopyExamURL = () => {
    navigator.clipboard.writeText(copyText);

    handleNotify("Sao chép thành công", "SUCCESS");
  };

  return (
    <div onClick={handleCopyExamURL} className="hover:cursor-pointer">
      {children}

      <Popup />
    </div>
  );
};

export default CopyBox;
