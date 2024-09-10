import { User } from "lucide-react";
import { SetStateAction } from "react";

interface TabListProps {
  selectedTab: string;
  setSelectTab: React.Dispatch<SetStateAction<string>>;
}

const TABS = [
  {
    name: "Chung",
    value: "COMMON",
    icon: User,
  },
  {
    name: "Đổi mật khẩu",
    value: "CHANGE_PASSWORD",
    icon: User,
  },
  {
    name: "Đơn vị đo",
    value: "UNIT",
    icon: User,
  },
  {
    name: "Lịch sử giao dịch",
    value: "TRANSACTION_HISTORY",
    icon: User,
  },
  {
    name: "Lịch sử rút tiền",
    value: "WIDTHDRAW_HISTORY",
    icon: User,
  },
];

const TabList: React.FC<TabListProps> = (props) => {
  const { selectedTab, setSelectTab } = props;

  return (
    <div className="col-span-3">
      <div className="space-y-2 rounded-md bg-white p-6 shadow-sm">
        {TABS.map((tab, key) => (
          <div
            className={
              "flex items-center gap-2 rounded-md p-2 shadow-sm hover:cursor-pointer " +
              (selectedTab === tab.value
                ? "bg-blue-800 font-semibold text-white"
                : "bg-white font-normal")
            }
            onClick={() => setSelectTab(tab.value)}
          >
            <tab.icon strokeWidth={1.5} className="size-4" />
            <div className="text-sm">{tab.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabList;
