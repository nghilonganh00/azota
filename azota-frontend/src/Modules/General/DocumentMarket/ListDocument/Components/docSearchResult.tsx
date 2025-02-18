import { ChevronRight } from "lucide-react";
import DocumentBox from "./documentBox";

const DocSearchResult = () => {
  return (
    <div className="mt-4 rounded-md bg-white px-4 py-2 shadow-md">
      <div>
        <div className="flex items-center gap-1">
          <div className="font-semibold text-gray-800">Tài liệu mới nhất</div>
          <ChevronRight className="size-4 text-gray-800" />
        </div>

        <div className="grid grid-cols-12 gap-3">
          <DocumentBox />
          <DocumentBox />
          <DocumentBox />
          <DocumentBox />
          <DocumentBox />
        </div>
      </div>
    </div>
  );
};

export default DocSearchResult;
