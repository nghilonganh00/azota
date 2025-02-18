import { ReactNode } from "react";
import { useState } from "react";
import Notification from "./Notification/notification";

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

      <Notification
        message={"Sao chép thành công"}
        isOpen={isOpenCopyNoti}
        setOpen={setOpenCopyNoti}
        type={"SUCCESS"}
      />
    </div>
  );
};

export default CopyBox;
