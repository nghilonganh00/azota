import { Outlet } from "react-router";
import TopBar from "../Components/TopBar/topBar";
import EditorTopBar from "../Components/editorTopBar";

const EditorLayout = () => {
  return (
    <div>
      <div className="flex h-screen overflow-y-hidden">
        <div className="flex flex-1 flex-col">
          <EditorTopBar />
          <div className="flex-1 overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
