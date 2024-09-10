import { useEffect, useState } from "react";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import PurposeAPI from "../../../../../API/purposeAPI";
import { Tab } from "../../../../../Globals/Interfaces/interface";
import { ConfigDropdownProps } from "../libs/interface";

const PurposeDropdown: React.FC<ConfigDropdownProps> = (props) => {
  const { selectedValue, setSelectValue } = props;
  const [purposes, setPurposes] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchPurpose = async () => {
      const data = await PurposeAPI.getAll();

      const purposeTabs = data?.map((purpose: any) => ({
        name: purpose.purposeName,
        value: purpose.id,
      }));

      setPurposes(purposeTabs);
      setSelectValue(purposeTabs[0]);
    };

    fetchPurpose();
  }, []);

  console.log(purposes);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Mục đích tạo đề</span>
      <Dropdown
        options={purposes}
        selectedValue={selectedValue}
        setSelectedValue={setSelectValue}
      />
    </div>
  );
};

export default PurposeDropdown;
