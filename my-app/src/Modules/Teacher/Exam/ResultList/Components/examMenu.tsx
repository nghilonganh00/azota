import { FileInput, LineChart, Settings, Target, Trash2 } from "lucide-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  {
    icon: Settings,
    label: "Cài đặt",
    link: "/teacher/exam/action-online-offline",
  },
  { icon: LineChart, label: "Thống kê", link: "", value: "" },
  { icon: Target, label: "Giám sát nâng cao", link: "", value: "" },
  { icon: FileInput, label: "Trả kết quả thi Offline", link: "", value: "" },
  { icon: Trash2, label: "Xóa", link: "", value: "TRASH" },
];

const ExamMenu = () => {
  const { hashId } = useParams();

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">Menu</div>

      <div className="rounded-md bg-gray-100 p-2">
        {MENU_ITEMS.map((item, key) => (
          <Link
            to={`${item.link}/${hashId}`}
            key={key}
            className={
              "flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-200 " +
              (item.value === "TRASH" && "text-red-600")
            }
          >
            <item.icon strokeWidth={1.5} className="size-4" />
            <div className="text-sm">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExamMenu;
