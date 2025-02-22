import { useEffect } from "react";
import { Outlet } from "react-router";
import "./index.css";

function App() {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      "dark",
      localStorage.currentTheme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
    // Whenever the user explicitly chooses light mode
    localStorage.currentTheme = "light";
    // Whenever the user explicitly chooses dark mode
    localStorage.currentTheme = "dark";
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
  }, []);
  return (
    <div className="bg-slate-100 font-[roboto] text-sm text-gray-800 dark:bg-[rgb(var(--color-darkmode-800))]">
      <Outlet />
    </div>
  );
}

export default App;
