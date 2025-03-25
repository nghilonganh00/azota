import { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { NOTIFICATION_TABS } from "../utils/constant";

interface TabListProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<SetStateAction<string>>;
}

const TabList: React.FC<TabListProps> = (props) => {
  const { selectedTab, setSelectedTab } = props;

  return (
    <div className="col-span-12 md:col-span-3">
      <div className="space-y-2 rounded-md bg-white p-6 shadow-sm dark:bg-darkmode-600 dark:text-gray-300">
        {NOTIFICATION_TABS.map((tab, index) => (
          <Link
            to={tab.link}
            key={index}
            className={
              "flex items-center gap-2 rounded-md p-2 shadow-sm hover:cursor-pointer " +
              (selectedTab === tab.key ? "bg-blue-800 font-semibold text-white" : "bg-transparent font-normal")
            }
            onClick={() => setSelectedTab(tab.key)}
          >
            <tab.icon strokeWidth={1.5} className="size-4" />
            <div className="text-sm">{tab.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabList;
