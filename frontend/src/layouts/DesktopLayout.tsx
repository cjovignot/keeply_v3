import { Outlet } from "react-router-dom";

const DesktopLayout = () => {
  // Ici tu pourrais calculer la largeur dynamiquement si nécessaire
  // useEffect(() => {
  //   const el = document.getElementById("left-side-nav");
  //   if (el) setSidebarWidth(el.offsetWidth);
  // }, []);

  return (
    <div className="flex h-screen">
      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DesktopLayout;
