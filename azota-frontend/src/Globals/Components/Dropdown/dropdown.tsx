import { Check, ChevronDown } from "lucide-react";
import { useState, Fragment } from "react";

interface DropdownProps {
  title?: string;
  options: any;
  selectedValue: any;
  setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { title, options, selectedValue, setSelectedValue } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleChangeValue = (option: any) => {
    setSelectedValue(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="multiLevelDropdownButton"
        data-dropdown-toggle="multi-dropdown"
        className="flex w-full items-center justify-between rounded-md border border-gray-200 px-5 py-2.5 text-center"
        type="button"
        onClick={() => setOpen((preValue) => !preValue)}
      >
        <div className="text-sm">{selectedValue ? selectedValue.name : title}</div>
        <ChevronDown className="size-4" strokeWidth={3} />
      </button>

      {isOpen && (
        <Fragment>
          <div className="fixed left-0 top-0 z-10 h-screen w-screen" onClick={() => setOpen(false)}></div>

          <div
            id="multi-dropdown"
            className="scrollbar absolute left-0 top-10 z-20 max-h-72 w-full divide-y divide-gray-100 overflow-y-scroll rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-darkmode-600"
          >
            <ul className="py-2 text-sm" aria-labelledby="multiLevelDropdownButton">
              {title && (
                <li className="my-2 flex items-center justify-between px-4 py-3 text-gray-300 dark:text-gray-900">
                  {title}
                </li>
              )}

              {options.map((option: any, key: string) => {
                return (
                  <li
                    key={key}
                    onClick={() => handleChangeValue(option)}
                    className={`flex items-center justify-between hover:cursor-pointer hover:bg-darkmode-700 dark:text-black ${selectedValue?.value === option.value ? "bg-zinc-100 text-blue-900 dark:bg-darkmode-700 dark:text-blue-700" : "hover:bg-gray-100"}`}
                  >
                    <a href="#" className="block px-4 py-3">
                      {option.name}
                    </a>

                    <div className="pr-4">
                      {selectedValue?.value === option.value && (
                        <Check className="size-5 text-blue-700" strokeWidth={2} />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dropdown;
