import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import "./index.css";
import { useSearchParams } from "react-router-dom";
import { connectSocket, disconnectSocket } from "./services/socketService";

function App() {
  //Change darkmode
  useEffect(() => {
    const currentTheme = localStorage.getItem("currentTheme");

    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("currentTheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("currentTheme", "light");
    }

    connectSocket();
  }, []);

  return (
    <div className="bg-slate-100 font-[roboto] text-sm text-gray-800 dark:bg-[rgb(var(--color-darkmode-800))]">
      <Outlet />
    </div>
  );
}

export default App;
