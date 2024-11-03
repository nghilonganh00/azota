import "./index.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="bg-slate-100 font-[roboto] text-sm text-gray-800">
      <Outlet />
    </div>
  );
}

export default App;
