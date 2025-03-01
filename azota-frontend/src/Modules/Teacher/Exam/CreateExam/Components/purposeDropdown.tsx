import { Fragment, useEffect, useState } from "react";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import PurposeAPI from "../../../../../API/purposeAPI";
import { Tab } from "../../../../../Globals/Interfaces/interface";
import { ConfigDropdownProps } from "../libs/interface";
import { Check, ChevronDown } from "lucide-react";
import { Purpose } from "../../../../../Globals/Interfaces/info.interface";

const TITLE = "---Chọn mục đích---";

const PurposeDropdown: React.FC<ConfigDropdownProps> = (props) => {
  const { selectedValue, setSelectValue } = props;
  const [groupedPurposes, setGroupedPurposes] = useState<Record<number, Purpose[]>>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleChangeValue = (option: any) => {
    setSelectValue(option);
    setOpen(false);
  };

  useEffect(() => {
    const fetchPurpose = async () => {
      const respone = await PurposeAPI.getAll();

      const purposes: Purpose[] = respone?.data || [];

      const groupedPurposesData = purposes.reduce(
        (acc: any, item) => {
          if (!acc[item.semester]) {
            acc[item.semester] = [];
          }

          acc[item.semester].push(item);
          return acc;
        },
        {} as Record<number, typeof purposes>,
      );

      Object.keys(groupedPurposesData).forEach((semester) => {
        groupedPurposesData[Number(semester)].sort((a: Purpose, b: Purpose) => a.position - b.position);
      });

      setGroupedPurposes(groupedPurposesData);
    };

    fetchPurpose();
  }, []);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Mục đích tạo đề</span>

      <div className="relative">
        <button
          id="multiLevelDropdownButton"
          data-dropdown-toggle="multi-dropdown"
          className="flex w-full items-center justify-between rounded-md border border-gray-200 px-5 py-2.5 text-center"
          type="button"
          onClick={() => setOpen((preValue) => !preValue)}
        >
          <div className="text-sm">{selectedValue ? selectedValue.name : TITLE}</div>
          <ChevronDown className="size-4" strokeWidth={3} />
        </button>

        {isOpen && (
          <Fragment>
            <div className="fixed left-0 top-0 z-10 h-screen w-screen" onClick={() => setOpen(false)}></div>

            <div
              id="multi-dropdown"
              className="absolute left-0 top-10 z-20 max-h-72 w-full divide-y divide-gray-100 overflow-y-scroll rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-darkmode-600"
            >
              <ul className="py-2 text-sm" aria-labelledby="multiLevelDropdownButton">
                <li className="flex items-center justify-between text-gray-300">
                  <a href="#" className="block px-4 py-3">
                    {TITLE}
                  </a>
                </li>

                {Object.keys(groupedPurposes).map((semester) => {
                  const purposes = groupedPurposes[Number(semester)];

                  return (
                    <li key={semester} className="">
                      <div className="px-4 py-2 text-base font-medium text-gray-800 dark:text-black">
                        {Number(semester) === -1 ? "Mục đích khác" : `Học kỳ ${semester}`}
                      </div>

                      <ul>
                        {purposes.map((purpose) => (
                          <li
                            key={purpose.id}
                            onClick={() => handleChangeValue({ name: purpose.title, value: purpose.id } as Tab)}
                            className={`flex items-center justify-between px-4 hover:cursor-pointer dark:text-black ${
                              selectedValue?.value === purpose.id
                                ? "bg-zinc-100 text-blue-900 dark:bg-darkmode-700"
                                : "hover:bg-gray-100 dark:hover:bg-darkmode-700"
                            }`}
                          >
                            <a href="#" className="block px-4 py-3">
                              {purpose.title}
                            </a>

                            <div className="pr-4">
                              {selectedValue?.value === purpose.id && (
                                <Check className="size-5 text-blue-700" strokeWidth={2} />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PurposeDropdown;
