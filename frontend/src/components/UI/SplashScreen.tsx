// frontend/src/components/SplashScreen.tsx
import { useEffect, useState } from "react";
import pkg from "../../../package.json";

type SplashScreenProps = {
  children: React.ReactNode;
  minDuration?: number; // ms
};

export default function SplashScreen({
  children,
  minDuration = 1500,
}: SplashScreenProps) {
  const [show, setShow] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Commence l'animation de sortie après minDuration
    const timeout = setTimeout(() => setAnimateOut(true), minDuration);
    // Retire complètement le splash après la durée de l'animation
    const removeTimeout = setTimeout(() => setShow(false), minDuration + 500);
    return () => {
      clearTimeout(timeout);
      clearTimeout(removeTimeout);
    };
  }, [minDuration]);

  if (show) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
          animateOut
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
        style={{ transitionTimingFunction: "ease-in" }}
      >
        {/* Dégradé + vignette via CSS */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, #020617 0%, #030712 35%, #0f172a 70%, #020617 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Logo centré avec animation pulse */}
        <img
          src="/icons/logo.png"
          alt="Logo"
          style={{
            width: "80vw",
            maxWidth: "320px",
            zIndex: 10,
            animation: "pulse 3s ease-in-out infinite",
          }}
        />

        {/* Version en bas avec fade-in */}
        <span
          style={{
            position: "absolute",
            bottom: "5%",
            color: "rgba(255,221,0,0.46)",
            fontSize: "1.8vh",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "1px",
            zIndex: 10,
            opacity: 0,
            animation: "fadeInText 1s forwards 0.5s",
          }}
        >
          version {pkg.version}
        </span>

        {/* Animations CSS */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(0.4); }
              100% { transform: scale(1.3); }
            }

            @keyframes fadeInText {
              to { opacity: 1; }
            }
          `}
        </style>
      </div>
    );
  }

  return <>{children}</>;
}
