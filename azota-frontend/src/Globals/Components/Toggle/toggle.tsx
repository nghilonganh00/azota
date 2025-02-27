import React from "react";

interface ToggleProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggle: React.FC<ToggleProps> = ({ isOpen, setOpen }) => {
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.checked);
  };

  return (
    <div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" checked={isOpen} onChange={handleToggleChange} />
        <div className="peer relative h-6 w-11 rounded-full border border-slate-400 bg-white after:absolute after:start-[2px] after:top-[1px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-slate-400 after:transition-all after:content-[''] peer-checked:bg-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none dark:border-none"></div>
      </label>
    </div>
  );
};

export default Toggle;
