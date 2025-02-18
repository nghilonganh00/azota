import React from "react";
import convertToInitials from "../Utils/convertToInitials";

interface StudentAvatarProps {
  fullname: string;
}

const StudentAvatar: React.FC<StudentAvatarProps> = (props) => {
  const { fullname } = props;

  return (
    <div className="flex size-10 items-center justify-center rounded-full bg-zinc-300">
      <div className="text-lg font-semibold uppercase">{convertToInitials(fullname)}</div>
    </div>
  );
};

export default StudentAvatar;
