import { AccountSettingTabs } from "../utils/constant";
import { ChangePasswordPanel } from "./changePasswordPanel";
import { GeneralPanel } from "./generalPanel";

interface TabPanelsProp {
  selectedTab: string;
}

const TabPanels: React.FC<TabPanelsProp> = (props) => {
  const { selectedTab } = props;

  return (
    <div className="col-span-9">
      <div className="rounded-md bg-white p-5 shadow dark:bg-darkmode-600">
        {selectedTab === AccountSettingTabs.GENERAL && <GeneralPanel />}
        {selectedTab === AccountSettingTabs.CHANGE_PASSWORD && <ChangePasswordPanel />}
      </div>
    </div>
  );
};

export default TabPanels;
