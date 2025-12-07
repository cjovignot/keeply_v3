import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const googleClient = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // 🔹 Détecte si l'app tourne en PWA
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;
    setIsPWA(standalone);

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!standalone) {
      // Navigateur classique → bouton GSI
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: any) => {
            if (!response?.credential) return;
            await loginWithGoogle(response.credential, false);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          disable_auto_prompt: true,
        });

        // @ts-ignore
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
        setIsLoaded(true);
      };

      document.body.appendChild(script);
    } else {
      // PWA → flux popup
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // @ts-ignore
        googleClient.current = google.accounts.oauth2.initCodeClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "openid email profile",
          ux_mode: "popup",
          use_fedcm_for_prompt: false,
          prompt: "consent",
          callback: async (response: any) => {
            if (!response?.code) return;
            await loginWithGoogle(response.code, true);
          },
        });
        setIsLoaded(true);
      };

      document.body.appendChild(script);
    }
  }, [loginWithGoogle]);

  const handlePopupLogin = () => {
    if (googleClient.current) googleClient.current.requestCode();
  };

  return !isPWA ? (
    <div id="googleSignIn" className="rounded-full shadow-md"></div>
  ) : (
    <button
      disabled={!isLoaded}
      onClick={handlePopupLogin}
      className="flex items-center w-[250px] h-[50px] px-1 py-3 transition-all duration-200 bg-[#131314] rounded-full shadow hover:shadow-lg hover:scale-105"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-10 p-2 mr-3 bg-white rounded-full"
      />
      <span className="flex justify-center w-full text-sm font-medium text-white">
        Sign in with Google
      </span>
    </button>
  );
};
