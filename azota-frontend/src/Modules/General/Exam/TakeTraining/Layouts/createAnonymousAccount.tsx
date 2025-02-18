import { OctagonAlert } from "lucide-react";
import { useState } from "react";
import UserAPI from "../../../../../API/userAPI";

interface CreateAnonymousAccountProps {
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreateAnonymousAccount: React.FC<CreateAnonymousAccountProps> = (props) => {
  const { setUserToken } = props;

  const [fullName, setFullName] = useState<string>("");

  const handleOnChangeFullName = (fullname: string) => {
    setFullName(fullname);
  };

  const handleCreateAccount = async () => {
    const response: any = await UserAPI.createAnonymous(fullName);
    if (!response.ok) return;

    const responseObj = await response.json();
    const newUser = responseObj.data;
    console.log("new user: ", newUser);
    localStorage.setItem("user-token", newUser.accessToken);
    setUserToken(newUser.accessToken);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#3c3c3c80] text-sm text-gray-800">
      <div className="w-[760px] rounded bg-white p-3 shadow-xl">
        <div className="flex items-center gap-2">
          <OctagonAlert className="size-6 text-orange-500" strokeWidth={1.5} />
          <div className="font-semibold">Vui lòng nhập thêm thông tin để bắt đầu bài thi</div>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Những thông tin này sẽ giúp giáo viên định danh và chấm điểm cho bạn
        </div>

        <div className="mt-6 flex">
          <div className="rounded-l bg-slate-200 py-2 pl-2 pr-14 font-medium text-gray-600">
            Họ và tên
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => handleOnChangeFullName(e.target.value)}
            className="flex-1 rounded-r border border-gray-200 p-2"
          />
        </div>

        <div className="mt-1 text-xs text-gray-600">Tài khoản ẩn danh cần điền họ và tên</div>

        <button
          onClick={handleCreateAccount}
          disabled={fullName === ""}
          className={
            "float-right mt-5 rounded-md bg-blue-800 px-10 py-2 " +
            (fullName === "" ? "opacity-30" : "opacity-100 hover:cursor-pointer")
          }
        >
          <div className="text-sm font-semibold text-white">Xác nhận</div>
        </button>
      </div>
    </div>
  );
};

export default CreateAnonymousAccount;
