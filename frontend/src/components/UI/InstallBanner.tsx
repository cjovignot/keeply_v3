import { useEffect, useState } from "react";
import { isIOS, isPWAInstalled } from "../../utils/pwa";
import { usePWAInstallPrompt } from "../../hooks/usePWAInstallPrompt";
import { usePWAUpdate } from "../../hooks/usePWAUpdate";
import { FaApple } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Buttons";
import { useLayout } from "../../hooks/useLayout";

const STORAGE_KEY = "keeeply-pwa-install-dismissed";

export function InstallBanner() {
  const { canInstall, promptInstall } = usePWAInstallPrompt();
  const { updateAvailable, reloadApp } = usePWAUpdate();
  const [visible, setVisible] = useState(false);
  const [compact, setCompact] = useState(false);
  const { isMobile } = useLayout();

  // Affichage initial
  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateAvailable || (!isPWAInstalled() && (canInstall || isIOS()))) {
        setVisible(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [canInstall, updateAvailable]);

  // Scroll compact dans MobileLayout
  useEffect(() => {
    if (!visible) return;

    const scrollContainer = document.querySelector<HTMLDivElement>(
      ".flex-1.overflow-y-auto"
    );
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollTop > 50) setCompact(true);
      else setCompact(false);
    };

    handleScroll();
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [visible]);

  if (!visible) return null;

  const handleUpdate = () => {
    if (isIOS()) {
      window.open("https://keeeply.app/", "_blank");
    } else {
      reloadApp();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={`
  fixed top-4 z-999 rounded-xl border shadow-xl 
  bg-gray-900/95 border-gray-800 overflow-hidden
  ${isMobile ? "left-4 right-4" : "right-4 left-auto max-w-1/3"}
`}
    >
      <AnimatePresence mode="wait">
        {!compact ? (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <p className="text-xs text-white mb-2">
              {updateAvailable
                ? "🚀 Une nouvelle version de Keeeply est disponible !"
                : "📦 Gardez Keeeply toujours sous la main pour retrouver vos objets instantanément"}
            </p>

            {isIOS() && !updateAvailable && (
              <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-3 my-2 text-xs text-gray-200">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <FaApple size={16} />
                  <span className="font-medium">
                    Installer Keeeply sur iPhone
                  </span>
                </div>
                <ol className="space-y-1 opacity-90 list-decimal list-inside">
                  <li className="flex items-center gap-2">
                    <IoShareOutline size={14} />
                    <span>
                      Appuyez sur <strong>Partager</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="ml-6">
                      Puis <strong>Sur l’écran d’accueil</strong>
                    </span>
                  </li>
                </ol>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-2">
              {!updateAvailable && canInstall && !isPWAInstalled() && (
                <Button
                  onClick={promptInstall}
                  label="Installer"
                  size={18}
                  variant="sm_outlined_accent"
                  className="px-8"
                />
              )}

              {updateAvailable && (
                <Button
                  onClick={handleUpdate}
                  label="Mettre à jour"
                  size={18}
                  variant="sm_outlined_accent"
                  className="px-8"
                />
              )}

              <button
                onClick={() => {
                  localStorage.setItem(STORAGE_KEY, "true");
                  setVisible(false);
                }}
                className="text-xs text-gray-400 px-2"
              >
                Plus tard
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-12 px-4 flex items-center justify-between"
          >
            <span className="text-xs text-white">
              {updateAvailable
                ? "🚀 Mise à jour dispo !"
                : "📦 Keeeply à portée de main"}
            </span>

            <div className="flex items-center gap-2">
              {!updateAvailable && canInstall && !isPWAInstalled() && (
                <Button
                  onClick={promptInstall}
                  label="Installer"
                  size={14}
                  variant="sm_outlined_accent"
                  className="px-4 py-1"
                />
              )}

              {updateAvailable && (
                <Button
                  onClick={handleUpdate}
                  label="Mettre à jour"
                  size={14}
                  variant="sm_outlined_accent"
                  className="px-4 py-1"
                />
              )}

              <button
                onClick={() => {
                  localStorage.setItem(STORAGE_KEY, "true");
                  setVisible(false);
                }}
                className="text-gray-400"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
