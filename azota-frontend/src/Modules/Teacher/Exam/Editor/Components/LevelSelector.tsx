import { CircleX, Tag } from "lucide-react";
import { useState } from "react";

interface LevelSelectorProps {
  level: string;
  handleChangeLevel: (level: string) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = (props) => {
  const { level, handleChangeLevel } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLevelSelector = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLevel = (level: string) => {
    handleChangeLevel(level);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="border-r border-gray-300 py-0.5 pr-3" onClick={handleOpenLevelSelector}>
        {level ? (
          <div className="flex items-center gap-1 rounded-full bg-gray-300 px-3 py-0.5 text-gray-600">
            <div className="text-xs font-semibold">
              {level === "EASY" ? "NB" : level === "MEDIUM" ? "TH" : level === "HARD" ? "VD" : "NB"}
            </div>
            <CircleX className="size-4 hover:cursor-pointer" onClick={() => handleSelectLevel("")} />
          </div>
        ) : (
          <div>
            <Tag className="size-4 text-blue-800" />
          </div>
        )}
      </div>

      {isOpen && (
        // INSERT_YOUR_CODE
        <div>
          <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} style={{ background: "transparent" }} />

          <div className="absolute left-0 top-6 z-10 w-[300px] rounded-md border-r bg-white p-3 dark:bg-darkmode-600">
            <div className="">
              <div
                className="rounded-md p-2 hover:cursor-pointer hover:bg-darkmode-400"
                onClick={() => handleSelectLevel("EASY")}
              >
                Nhận biết
              </div>
              <div
                className="rounded-md p-2 hover:cursor-pointer hover:bg-darkmode-400"
                onClick={() => handleSelectLevel("MEDIUM")}
              >
                Thông hiểu
              </div>
              <div
                className="rounded-md p-2 hover:cursor-pointer hover:bg-darkmode-400"
                onClick={() => handleSelectLevel("HARD")}
              >
                Vận dụng
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelSelector;
