import { Edit, Upload } from "lucide-react";
import { Gender } from "../../../../Globals/Constant/constant";
import { ChangeEvent, useEffect, useState } from "react";
import UserAPI from "../../../../API/userAPI";
import { User } from "../../../../Globals/Interfaces/user.interface";
import FirebaseStorage from "../../../../Firebase/firebaseStorage";

export const GeneralPanel = () => {
  const [user, setUser] = useState<User>({} as User);

  const handleChangeUserInfo = (name: string, value: any) => {
    setUser((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const uploadResponse = await FirebaseStorage.upload(file);

    if (!uploadResponse || !uploadResponse.downloadURL) {
      throw new Error("Failed to upload avatar.");
    }

    handleChangeUserInfo("avatarURL", uploadResponse.downloadURL);
  };

  const handleUpdate = async () => {
    const { fullName, DOB, email, gender, phone, avatarURL } = user;
    if (!fullName || !gender) return;

    const response = await UserAPI.updateUser(fullName, DOB, email, phone, gender, avatarURL);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await UserAPI.getInfo();
      if (response?.status === 200) {
        setUser(response.data);
      }
    };

    fetchUserData();
  }, []);

  return (
    <form className="mt-6">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 flex items-center gap-4">
          {user.avatarURL ? (
            <img src={user.avatarURL} className="size-24 rounded-full object-cover" />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-full bg-sky-600">
              <div className="text-6xl text-white">B</div>
            </div>
          )}

          <div className="space-y-1">
            <label
              id="avatar"
              className="inline-flex items-center gap-2 rounded-md border border-blue-800 p-1.5 text-blue-700 hover:cursor-pointer"
            >
              <Upload strokeWidth={1.5} className="size-4" />
              <div className="text-xs font-semibold">Tải lên</div>

              <input type="file" id="avatar" accept="image/*" className="hidden" onChange={handleChangeAvatar} />
            </label>
            <div className="text-xs text-gray-500 dark:text-slate-400">Tải lên file ảnh và kích thước tối đa 5MB</div>
          </div>
        </div>

        <div className="col-span-6">
          <label htmlFor="fullname" className="mb-1.5 inline-block">
            Họ và tên
          </label>
          <input
            type="text"
            id="fullname"
            name="fullName"
            value={user?.fullName}
            onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            required
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="username" className="mb-1.5 inline-block">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Username..."
            disabled
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="dob" className="mb-1.5 inline-block">
            Ngày sinh
          </label>
          <input
            type="date"
            id="dob"
            name="DOB"
            value={user?.DOB && new Date(user.DOB).toISOString().slice(0, 10)}
            onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Ngày sinh"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="email" className="mb-1.5 inline-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập email..."
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="phone" className="mb-1.5 inline-block">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập số điện thoại..."
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="" className="mb-1.5 inline-block">
            Giới tính
          </label>

          <div className="flex items-center gap-4 border p-2 pr-8 dark:border-darkmode-400">
            <label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value={Gender.MALE}
                checked={user.gender === Gender.MALE}
                onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
              />{" "}
              Nam
            </label>

            <label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value={Gender.FEMALE}
                checked={user.gender === Gender.FEMALE}
                onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
              />{" "}
              Nữ
            </label>

            <label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value={Gender.OTHER}
                checked={user.gender === Gender.OTHER}
                onChange={(e) => handleChangeUserInfo(e.target.name, e.target.value)}
              />{" "}
              Khác
            </label>
          </div>
        </div>

        <div className="col-span-12">
          <label htmlFor="school" className="mb-1.5 inline-block">
            Thông tin trường
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="school"
              className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            />

            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 dark:border-darkmode-400"
            >
              <Edit className="size-4" />
              <span>Thêm</span>
            </button>
          </div>
        </div>

        <div className="col-span-12">
          <label htmlFor="grade-subject" className="mb-1.5 inline-block">
            Khối dạy và môn dạy
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="grade-subject"
              className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            />

            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 dark:border-darkmode-400"
            >
              <Edit className="size-4" />
              <span>Thêm</span>
            </button>
          </div>
        </div>
        <div className="col-span-12 text-right">
          <button
            type="button"
            onClick={handleUpdate}
            className="float-right rounded-md bg-blue-800 px-8 py-2.5 hover:bg-blue-600"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </form>
  );
};
