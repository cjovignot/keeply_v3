import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import LeftSideNav from "../components/LeftSideNav";

const DesktopLayout = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { key } = useLocation();
  const navType = useNavigationType();
  const scrollPositions = useRef<Record<string, number>>({});
  const rafRef = useRef<number | null>(null);
  const saveThrottleRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current || saveThrottleRef.current) return;

    saveThrottleRef.current = true;
    rafRef.current = requestAnimationFrame(() => {
      saveThrottleRef.current = false;
      scrollPositions.current[key] = scrollRef.current!.scrollTop;
    });
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tryScroll = (top: number, attempts = 3, delay = 40) => {
      const attempt = (remaining: number) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({ top, behavior: "auto" });
        if (remaining > 0 && Math.abs(scrollRef.current.scrollTop - top) > 2) {
          setTimeout(() => attempt(remaining - 1), delay);
        }
      };
      attempt(attempts);
    };

    if (navType === "POP") {
      const saved = scrollPositions.current[key];
      if (typeof saved === "number") {
        requestAnimationFrame(() => tryScroll(saved, 4, 50));
        return;
      }
    }

    requestAnimationFrame(() => tryScroll(0, 4, 50));
  }, [key, navType]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar gauche */}

      {/* Contenu scrollable */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <Outlet />
      </div>
      <LeftSideNav />
    </div>
  );
};

export default DesktopLayout;
