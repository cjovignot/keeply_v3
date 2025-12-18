import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export function usePWAInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();

      deferredPrompt = e as BeforeInstallPromptEvent;

      // Planifie le setState pour éviter le warning React
      setTimeout(() => setCanInstall(true), 0);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt(); // Affiche le vrai prompt
    const choice = await deferredPrompt.userChoice;

    deferredPrompt = null;
    setCanInstall(false);

    return choice;
  };

  return { canInstall, promptInstall };
}
