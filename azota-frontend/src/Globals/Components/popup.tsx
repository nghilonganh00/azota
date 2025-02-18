import { X } from "lucide-react";
import { Fragment, SetStateAction } from "react";

interface PopupProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = (props) => {
  const { isOpen, setOpen, children } = props;

  return (
    <Fragment>
      {isOpen && (
        <div className="fixed inset-0 z-40 !m-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setOpen(false)}
          ></div>
          <div className="relative z-50 flex items-center justify-center">{children}</div>
        </div>
      )}
    </Fragment>
  );
};

export default Popup;
