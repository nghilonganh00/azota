import { NotificationTabs } from "../utils/constant";
import AllPanel from "./AllPanel";
import HomeworkPanel from "./homeworkPanel";

interface TabPanelsProp {
  selectedTab: string;
}

const TabPanels: React.FC<TabPanelsProp> = (props) => {
  const { selectedTab } = props;

  return (
    <div className="col-span-12 md:col-span-9">
      <div className="rounded-md shadow">{selectedTab === NotificationTabs.ALL && <AllPanel />}</div>
      <div className="rounded-md shadow">{selectedTab === NotificationTabs.HOMEWORK && <HomeworkPanel />}</div>
    </div>
  );
};

export default TabPanels;
