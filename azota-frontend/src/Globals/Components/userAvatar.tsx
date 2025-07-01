import React from "react";
import convertToInitials from "../../Modules/Teacher/Homework/ResultsList/Utils/convertToInitials";

interface StudentAvatarProps {
  fullname: string;
  className?: string;
}

const UserAvatar: React.FC<StudentAvatarProps> = (props) => {
  const { fullname, className = "size-10" } = props;

  return (
    <div className={`flex items-center justify-center rounded-full bg-zinc-300 ${className} text-gray-800`}>
      <div className="text-lg font-semibold uppercase">{convertToInitials(fullname)}</div>
    </div>
  );
};

export default UserAvatar;
