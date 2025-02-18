import { GraduationCap, User } from "lucide-react";
import { newUser } from "../interface";

interface RoleTabsProps {
  values: newUser;
  onChange: (name: string, newValue: string) => void;
}

const ROLETABS = [
  {
    label: "Học sinh",
    value: "STUDENT",
    icon: GraduationCap,
  },
  {
    label: "Giáo viên",
    value: "TEACHER",
    icon: User,
  },
];

const RoleTabs: React.FC<RoleTabsProps> = (props) => {
  const { values, onChange } = props;

  return (
    <div className="flex w-full items-center">
      {ROLETABS.map((tab) => (
        <div
          onClick={() => onChange("userRole", tab.value)}
          className={
            "flex-1 border-b-2 py-2 hover:cursor-pointer " +
            (values["userRole"] === tab.value ? "border-b-2 border-blue-800" : "")
          }
        >
          <div className="flex items-center justify-center gap-2">
            <tab.icon strokeWidth={1.5} className="size-4" />
            <div
              className={
                "text-sm font-semibold " + (values["userRole"] === tab.value ? "" : "text-gray-600")
              }
            >
              {tab.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleTabs;
