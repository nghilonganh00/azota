import { useEffect, useState } from "react";
import "./index.css";
import { Outlet, useNavigate } from "react-router";
import UserAPI from "./API/userAPI";

function App() {
 
 
  return (
    <div className="min-h-screen bg-slate-100 font-[roboto] text-gray-800">
      <Outlet />
    </div>
  );
}

export default App;
