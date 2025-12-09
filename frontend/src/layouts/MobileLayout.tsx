import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import BottomNav from "../components/BottomNav";

const MobileLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll en haut de la div scrollable
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]); // à chaque changement de page

  return (
    <div className="flex flex-col h-screen">
      {/* Contenu scrollable */}
      <div ref={scrollRef} className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </div>

      {/* Barre de navigation fixe */}
      <BottomNav />
    </div>
  );
};

export default MobileLayout;