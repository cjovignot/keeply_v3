import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Écoute le changement
    mediaQuery.addEventListener("change", handler);

    // Nettoyage
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
