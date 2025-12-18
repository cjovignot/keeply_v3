import { useEffect, useState } from "react";
import { isIOS, isPWAInstalled } from "../../utils/pwa";
import { usePWAInstallPrompt } from "../../hooks/usePWAInstallPrompt";
import { usePWAUpdate } from "../../hooks/usePWAUpdate";
import { FaApple } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Button from "./Buttons";

// Exemple : tu peux injecter la version depuis ton package.json
const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

const STORAGE_KEY = "keeeply-pwa-install-dismissed";

export function InstallBanner() {
  const { canInstall, promptInstall } = usePWAInstallPrompt();
  const { updateAvailable, reloadApp } = usePWAUpdate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const shouldShow =
      (!isPWAInstalled() && canInstall) || isIOS() || updateAvailable;

    if (shouldShow) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }
  }, [canInstall, updateAvailable]);

  if (!visible) return null;

  const mainMessage = updateAvailable
    ? "🚀 Une nouvelle version de Keeeply est disponible !"
    : !isPWAInstalled() && canInstall
    ? "📱 Installez Keeeply pour une expérience plus rapide et hors ligne"
    : "📦 Gardez Keeeply toujours sous la main pour retrouver vos objets instantanément";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-4 right-4 z-50 rounded-xl bg-gray-900/95 border border-gray-800 p-4 shadow-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex-1 text-xs text-white">
          <p className="mb-1 flex items-center gap-2">
            {mainMessage}

            {/* Badge version si update */}
            {updateAvailable && (
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-600 animate-pulse">
                v{APP_VERSION}
              </span>
            )}
          </p>

          {/* Instructions iOS si pas de mise à jour */}
          {isIOS() && !updateAvailable && (
            <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-3 my-2 text-xs text-gray-200">
              <div className="mb-2 flex items-center gap-2 text-white">
                <FaApple size={16} />
                <span className="font-medium">
                  Installer Keeeply sur iPhone
                </span>
              </div>
              <ol className="space-y-1 opacity-90">
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
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Bouton installer PWA */}
          {canInstall && !updateAvailable && (
            <Button
              onClick={promptInstall}
              label="Installer"
              size={18}
              variant="sm_outlined_accent"
              className="px-6"
            />
          )}

          {/* Bouton mettre à jour */}
          {updateAvailable && (
            <Button
              onClick={reloadApp}
              label="Mettre à jour"
              size={18}
              variant="sm_outlined_accent"
              className="px-6"
            />
          )}

          {/* Plus tard */}
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
      </div>
    </motion.div>
  );
}
