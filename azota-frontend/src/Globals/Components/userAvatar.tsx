import React from "react";
import convertToInitials from "../../Modules/Teacher/Homework/ResultsList/Utils/convertToInitials";

interface StudentAvatarProps {
  fullname: string;
  className?: string;
}

const UserAvatar: React.FC<StudentAvatarProps> = (props) => {
  const { fullname, className } = props;

  return (
    <div
      className={`flex size-10 items-center justify-center rounded-full bg-zinc-300 ${className}`}
    >
      <div className="text-lg font-semibold uppercase">{convertToInitials(fullname)}</div>
    </div>
  );
};

export default UserAvatar;
