import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import BottomNav from "../components/BottomNav";

const MobileLayout = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { pathname, key } = useLocation();
  const navType = useNavigationType(); // "POP" = back/forward
  const scrollPositions = useRef<Record<string, number>>({});
  const rafRef = useRef<number | null>(null);
  const saveThrottleRef = useRef(false);

  // Désactive la restauration automatique du navigateur (évite des conflits).
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Sauvegarde la position (throttled via rAF)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    if (saveThrottleRef.current) return;

    saveThrottleRef.current = true;
    rafRef.current = requestAnimationFrame(() => {
      saveThrottleRef.current = false;
      scrollPositions.current[key] = scrollRef.current!.scrollTop;
    });
  };

  // Restauration / Scroll-to-top selon le type de nav
  // useLayoutEffect pour tenter d'exécuter avant le paint (meilleure chance de succès)
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // helper pour effectuer plusieurs tentatives si le premier scroll n'est pas effectif
    const tryScroll = (top: number, attempts = 3, delay = 40) => {
      const attempt = (remaining: number) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({ top, behavior: "auto" });
        // si pas atteint, retenter après un petit délai
        if (remaining > 0 && Math.abs(scrollRef.current.scrollTop - top) > 2) {
          setTimeout(() => attempt(remaining - 1), delay);
        }
      };
      attempt(attempts);
    };

    // Si navigation arrière/avant, restaurer si on a une position sauvegardée pour cette key
    if (navType === "POP") {
      const saved = scrollPositions.current[key];
      if (typeof saved === "number") {
        // attendre un frame (ou deux) pour laisser le contenu se monter/mesurer
        requestAnimationFrame(() => {
          // fallback : si la taille du contenu change après le 1er RAF, on retente
          tryScroll(saved, 4, 50);
        });
        return;
      }
    }

    // Sinon (PUSH / REPLACE) -> scroll to top
    // On utilise tryScroll pour garantir l'effet si le contenu se charge asynchrone
    requestAnimationFrame(() => tryScroll(0, 4, 50));
  }, [key, navType]);

  // Nettoyage RAF
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Contenu scrollable */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 pb-20 overflow-y-auto"
      >
        <Outlet />
      </div>

      {/* Barre de navigation fixe */}
      <BottomNav />
    </div>
  );
};

export default MobileLayout;