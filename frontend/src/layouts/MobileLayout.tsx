import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BottomNav from "../components/BottomNav";

const MobileLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navType = useNavigationType(); // "POP" = retour arrière / avant
  const scrollPositions = useRef<Record<string, number>>({});

  // Sauvegarde la position au scroll
  const onScroll = () => {
    if (scrollRef.current) {
      scrollPositions.current[pathname] = scrollRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Restauration si retour arrière
    if (navType === "POP") {
      const saved = scrollPositions.current[pathname];
      el.scrollTo({
        top: saved ?? 0,
        behavior: "instant" as any,
      });
    } 
    // Sinon scroll top
    else {
      el.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, navType]);

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 pb-20 overflow-y-auto"
      >
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
};

export default MobileLayout;