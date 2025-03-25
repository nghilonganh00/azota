import { useState } from "react";
import TabList from "./Layout/tabList";
import { NotificationTabs } from "./utils/constant";
import TabPanels from "./Layout/tabPanels";

const Notification = () => {
  const [selectedTab, setSelectedTab] = useState<string>(NotificationTabs.ALL);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold dark:text-gray-300">Thông báo</h2>

      <div className="grid grid-cols-12 gap-4">
        <TabList selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <TabPanels selectedTab={selectedTab} />
      </div>
    </div>
  );
};

export default Notification;
