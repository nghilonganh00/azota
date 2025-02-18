import { ChevronLeft } from "lucide-react";
import useGoBack from "../../Hooks/useGoBack";

const GoBackButton = () => {
  const goBack = useGoBack();

  return (
    <div
      className="flex items-center justify-center gap-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-center shadow-sm"
      onClick={goBack}
    >
      <ChevronLeft strokeWidth={1.5} className="size-5 text-gray-500" />
      <span className="text-xs font-medium text-gray-500">Quay lại</span>
    </div>
  );
};

export default GoBackButton;
