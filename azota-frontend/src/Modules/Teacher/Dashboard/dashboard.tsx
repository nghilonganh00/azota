import { FileText, Folder, Layers, Users } from "lucide-react";

import { LuBookOpen, LuCircleAlert, LuCircleHelp } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom";

interface DashboardProps {}

const TABS = [
  { icon: FileText, label: "Bài tập", link: "/teacher/homework/management" },
  { icon: Folder, label: "Đề thi", link: "/teacher/exam/management" },
  { icon: Layers, label: "Quản lý lớp", link: "/teacher/class/management" },
  { icon: Users, label: "Quản lý giáo viên", link: "/teacher/teacher-group" },
  {
    icon: LuBookOpen,
    label: "Kho nội dung",
    link: "/document-market/list-document",
  },
];

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <div className="w-full text-gray-800">
      <div className="mx-auto w-4/5 pt-10">
        <div className="grid grid-cols-12 gap-6">
          {TABS.map((tab, index) => (
            <Link
              to={tab.link}
              key={index}
              className="col-span-6 h-full rounded-md bg-white shadow-sm duration-300 ease-in-out hover:scale-105 hover:shadow-md dark:bg-[rgb(var(--color-darkmode-600))] md:col-span-3"
            >
              <div className="p-8">
                <tab.icon className="mx-auto size-12 text-blue-800 dark:text-blue-700" strokeWidth={1.5} />
                <div className="mt-3 text-center font-medium dark:text-white">{tab.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <span className="rounded-sm bg-orange-400 px-3 py-2 text-sm font-bold text-white hover:cursor-pointer hover:bg-orange-500">
            Đăng ký cho tổ chức
          </span>
        </div>
      </div>

      <div className="mt-40 flex items-center gap-4 pl-6">
        <div className="rounded-md p-3 hover:cursor-pointer hover:bg-slate-300">
          <LuCircleAlert className="size-6 text-blue-800" />
        </div>
        <div className="rounded-md p-3 hover:cursor-pointer hover:bg-slate-300">
          <LuTrash2 className="size-6 text-blue-800" />
        </div>
        <div className="rounded-md p-3 hover:cursor-pointer hover:bg-slate-300">
          <LuCircleHelp className="size-6 text-blue-800" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
