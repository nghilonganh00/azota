import { Divide, RotateCcw, Star, X } from "lucide-react";
import { QuestionResult } from "../libs/interface";
import { Fragment } from "react";

interface NotificationPopupProps {
  isShowNoti: boolean;
  setShowNoti: React.Dispatch<React.SetStateAction<boolean>>;
  questionResult: QuestionResult;
  handleNextQuestion: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = (props) => {
  const { isShowNoti, setShowNoti, questionResult, handleNextQuestion } = props;

  const { correct, firstTime } = questionResult;

  const handleCloseNotification = () => {
    setShowNoti(false);
  };

  return (
    <Fragment>
      {isShowNoti && (
        <Fragment>
          {correct ? (
            <div className="absolute bottom-16 right-0 w-80 rounded-md bg-white p-3 shadow-md">
              <div className="flex items-center gap-2">
                <Star className="size-10 text-orange-500" strokeWidth={1.5} />
                <div>
                  <div className="text-lg font-medium">Làm tốt lắm</div>
                  <div className="mt-1">Hãy giữ vững phong độ. Tiến lên </div>
                </div>
              </div>

              <div
                onClick={handleCloseNotification}
                className="absolute right-1 top-1 rounded-md px-2 py-1.5 hover:cursor-pointer hover:bg-red-100"
              >
                <X className="size-5 text-sm text-red-600" />
              </div>
            </div>
          ) : (
            <div className="absolute bottom-16 right-0 w-80 rounded-md bg-white p-3 shadow-md">
              <div className="flex items-center gap-2">
                <RotateCcw className="size-10 text-blue-900" strokeWidth={1.5} />
                <div>
                  <div className="text-lg font-medium">Không đúng!</div>
                  <div className="mt-1">
                    Làm lại hoặc bạn có thể{" "}
                    <span
                      onClick={handleNextQuestion}
                      className="font-medium text-blue-800 hover:cursor-pointer"
                    >
                      bỏ qua
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={handleCloseNotification}
                className="absolute right-1 top-1 rounded-md px-2 py-1.5 hover:cursor-pointer hover:bg-red-100"
              >
                <X className="size-5 text-sm text-red-600" />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default NotificationPopup;
