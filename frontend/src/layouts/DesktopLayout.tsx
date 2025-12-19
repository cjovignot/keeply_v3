import { Outlet } from "react-router-dom";
import LeftSidePanel from "../components/LeftSidePanel";

const DesktopLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Panel de gauche */}
      <LeftSidePanel />

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DesktopLayout;
