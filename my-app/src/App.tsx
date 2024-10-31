import { useEffect, useState } from "react";
import "./index.css";
import { Outlet, useNavigate } from "react-router";
import UserAPI from "./API/userAPI";

function App() {
  return (
    <div className="bg-slate-100 font-[roboto] text-sm text-gray-800">
      <Outlet />
    </div>
  );
}

export default App;
