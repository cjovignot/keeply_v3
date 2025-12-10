import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const googleClient = useRef<any>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // -------------------------------------------------------------
    // 🔍 Détection du mode PWA
    // -------------------------------------------------------------
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;
    setIsPWA(standalone);

    // -------------------------------------------------------------
    // 🚀 Chargement du script Google GSI
    // -------------------------------------------------------------
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!standalone) {
        // -------------------------------------------------------------
        // 🌐 Mode navigateur → flux button GSI
        // -------------------------------------------------------------
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: any) => {
            if (!response?.credential) return;
            setIsLoading(true);

            // 🔥 Le backend reçoit isPWA = false → cookie HTTP-only
            await loginWithGoogle(response.credential, false);

            setIsLoading(false);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          disable_auto_prompt: true,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignIn")!,
          {
            theme: "filled_black",
            size: "large",
            shape: "pill",
            logo_alignment: "left",
            width: 250,
          }
        );
      } else {
        // -------------------------------------------------------------
        // 📱 Mode PWA → CodeClient popup
        // -------------------------------------------------------------
        googleClient.current = google.accounts.oauth2.initCodeClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "openid email profile",
          ux_mode: "popup",
          use_fedcm_for_prompt: false,
          prompt: "consent",
          callback: async (response: any) => {
            if (!response?.code) return;
            setIsLoading(true);

            // 🔥 Le backend reçoit isPWA = true → token renvoyé en JSON
            await loginWithGoogle(response.code, true);

            setIsLoading(false);
          },
        });
      }

      setIsLoaded(true);
    };

    document.body.appendChild(script);
  }, [loginWithGoogle]);

  const handlePopupLogin = () => {
    if (googleClient.current) googleClient.current.requestCode();
  };

  // -------------------------------------------------------------
  // 🌐 MODE NAVIGATEUR : Bouton officiel Google (GSI)
  // -------------------------------------------------------------
  if (!isPWA) {
    return (
      <div className="relative">
        {/* Bouton rendu par Google */}
        <div id="googleSignIn" className="rounded-full shadow-md"></div>

        {/* 🔥 Overlay loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center 
                          bg-black/50 rounded-full">
            <span className="text-white text-sm animate-pulse">
              Connexion en cours…
            </span>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // 📱 MODE PWA : Bouton custom (Google CodeClient Popup)
  // -------------------------------------------------------------
  return (
    <button
      disabled={!isLoaded || isLoading}
      onClick={handlePopupLogin}
      className={`flex items-center w-[250px] h-[50px] px-1 py-3 
                  transition-all duration-200 bg-[#131314] rounded-full shadow
                  ${
                    !isLoaded || isLoading
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-lg hover:scale-105"
                  }`}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-10 p-2 mr-3 bg-white rounded-full"
      />

      <span className="flex justify-center w-full text-sm font-medium text-white">
        {isLoading ? "Connexion en cours…" : "Se connecter avec Google"}
      </span>
    </button>
  );
};