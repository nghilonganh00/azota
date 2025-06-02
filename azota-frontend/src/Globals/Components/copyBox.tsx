import { ReactNode } from "react";
import { useState } from "react";
import { Popup } from "./Popup/popup";

interface CopyBoxProps {
  copyText: string;
  children: ReactNode;
}
const CopyBox: React.FC<CopyBoxProps> = (props) => {
  const { copyText, children } = props;
  const [isOpenCopyNoti, setOpenCopyNoti] = useState(false);

  const handleCopyExamURL = () => {
    navigator.clipboard.writeText(copyText);

    setOpenCopyNoti(true);
  };

  return (
    <div onClick={handleCopyExamURL} className="hover:cursor-pointer">
      {children}

      <Popup message={"Sao chép thành công"} isOpen={isOpenCopyNoti} setOpen={setOpenCopyNoti} type={"SUCCESS"} />
    </div>
  );
};

export default CopyBox;
