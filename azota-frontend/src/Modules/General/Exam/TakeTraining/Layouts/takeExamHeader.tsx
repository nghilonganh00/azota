import { Maximize, Timer, ZoomIn, ZoomOut } from "lucide-react";
import { useCountDown } from "../libs/hooks";
import { useEffect, useState } from "react";
import UserAPI from "../../../../../API/userAPI";
import { User } from "../../../../../Globals/Interfaces/user.interface";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface TakeExamHeaderProps {
  exam: Exam;
  handleFinish: () => void;
}

const TakeExamHeader: React.FC<TakeExamHeaderProps> = (props) => {
  const { exam, handleFinish } = props;

  const timeLeft = useCountDown(exam.duration);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (timeLeft.hours === "00" && timeLeft.minutes === "00" && timeLeft.seconds === "00") {
      // handleFinish();
      console.log("Time out");
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchUserInfoData = async () => {
      const response = await UserAPI.getInfo();

      if (response?.status !== 200) {
        return;
      }
      const userObj = response.data;
      console.log("userObj: ", userObj);
      setUser(userObj);
    };

    fetchUserInfoData();
  }, []);

  return (
    <div className="fixed left-0 top-0 flex w-screen items-center bg-white px-3 py-2">
      <div className="mx-auto text-sm font-medium">Thí sinh: {user?.fullname || ""}</div>

      <div className="flex items-center gap-2">
        <Timer strokeWidth={1.5} className="w-[20px]" />
        <div className="text-sm font-medium">{`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}</div>
      </div>

      <div className="ml-4 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-md bg-gray-100">
          <ZoomOut strokeWidth={1.6} className="w-[18px] text-slate-400" />
        </div>

        <div className="flex size-9 items-center justify-center rounded-md bg-slate-200/60">
          <ZoomIn strokeWidth={1.6} className="w-[18px] text-slate-500" />
        </div>
      </div>

      <div className="ml-3 flex size-9 items-center justify-center rounded-md bg-slate-200/60">
        <Maximize strokeWidth={1.6} className="w-[18px] text-slate-500" />
      </div>
    </div>
  );
};

export default TakeExamHeader;
