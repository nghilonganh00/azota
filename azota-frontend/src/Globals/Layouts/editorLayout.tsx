import { Outlet } from "react-router";
import EditorTopBar from "../Components/editorTopBar";

const EditorLayout = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-y-hidden">
      <EditorTopBar />
      <div className="scrollbar overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default EditorLayout;
