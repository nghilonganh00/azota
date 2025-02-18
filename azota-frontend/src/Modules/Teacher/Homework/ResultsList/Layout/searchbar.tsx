import { AlignJustify, Filter, PanelLeftClose, Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="rounded-md bg-white p-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
          <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative border-gray-300">
            <input
              type="text"
              className="w-56 rounded-md border border-gray-300 px-2 py-1 text-sm"
              placeholder="Tìm kiếm"
            />
            <Search className="absolute right-2 top-2 size-4 text-slate-600" />
          </div>

          <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold shadow-sm hover:cursor-pointer hover:bg-slate-100">
            <Filter className="size-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">Bộ lọc</span>
          </div>

          <div className="rounded-md border border-gray-300 px-2 py-1.5 hover:cursor-pointer">
            <AlignJustify className="size-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
