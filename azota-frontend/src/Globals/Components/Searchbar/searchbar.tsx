import { Search } from "lucide-react";

interface SearchbarProps {
  placeholder?: string;
  className?: string;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
  const { placeholder, className } = props;

  return (
    <div className={"relative " + className}>
      <input
        type="text"
        className="w-full rounded-md border px-2 py-1 text-sm"
        placeholder={placeholder}
      />
      <Search className="absolute right-2 top-2 size-4 text-slate-600" strokeWidth={1.5} />
    </div>
  );
};

export default Searchbar;
