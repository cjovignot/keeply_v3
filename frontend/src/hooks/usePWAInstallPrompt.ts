import { useEffect, useState } from "react";

let deferredPrompt: any = null;

export function usePWAInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    deferredPrompt = null;
    setCanInstall(false);

    return choice;
  };

  return { canInstall, promptInstall };
}
