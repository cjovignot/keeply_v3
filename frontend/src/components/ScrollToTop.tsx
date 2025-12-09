import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Premier choix : scroller l'élément de scroll principal du document
    const scroller = document.scrollingElement || document.documentElement;

    // Si tu as un conteneur principal (ex: #root, .app, .main) qui gère le scroll,
    // tu peux le cibler ici (ex: document.getElementById("root"))
    // const appScroller = document.getElementById("root");

    // Essayer d'abord le scroller global (document), sinon fallback sur window
    if (scroller) {
      scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      // fallback compatible navigateur
      window.scrollTo(0, 0);
    }
    // Si AnimatePresence/animations posent problème, tu peux décommenter le timeout léger :
    // const t = setTimeout(() => scroller?.scrollTo({ top: 0, behavior: "auto" }), 50);
    // return () => clearTimeout(t);
  }, [pathname]);

  return null;
};

export default ScrollToTop;