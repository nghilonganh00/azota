import TabList from "./Layout/tabList";
import { useState } from "react";
import TabPanels from "./Layout/tabPanels";

const AccountSetting = () => {
  const [selectedTab, setSelectTab] = useState<string>("COMMON");
  return (
    <div className="px-4 py-5">
      <div className="mb-6 text-lg font-semibold">Cài đặt tài khoản</div>
      <div className="grid grid-cols-12 gap-4">
        <TabList selectedTab={selectedTab} setSelectTab={setSelectTab} />
        <TabPanels selectedTab={selectedTab} />
      </div>
    </div>
  );
};

export default AccountSetting;
