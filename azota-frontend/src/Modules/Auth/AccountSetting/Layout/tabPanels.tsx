import CommonPanel from "./commonPanel";

interface TabPanelsProp {
  selectedTab: string;
}

const TabPanels: React.FC<TabPanelsProp> = (props) => {
  const { selectedTab } = props;

  return (
    <div className="col-span-9">
      <div className="rounded-md bg-white p-5 shadow-sm">
        {selectedTab === "COMMON" && <CommonPanel />}
      </div>
    </div>
  );
};

export default TabPanels;
