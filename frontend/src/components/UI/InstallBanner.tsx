import { useEffect, useState } from "react";
import { isIOS, isPWAInstalled } from "../../utils/pwa";
import { usePWAInstallPrompt } from "../../hooks/usePWAInstallPrompt";
import { FaApple } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Button from "./Buttons";

const STORAGE_KEY = "keeeply-pwa-install-dismissed";

export function InstallBanner() {
  const { canInstall, promptInstall } = usePWAInstallPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isPWAInstalled()) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Android / Desktop
    if (canInstall) {
      setVisible(true);
    }

    // iOS
    if (isIOS()) {
      setVisible(true);
    }
  }, [canInstall]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-4 right-4 z-999 rounded-xl bg-gray-900/95 border border-gray-800 p-4 shadow-xl"
    >
      <p className="text-xs text-white mb-1">
        📦 Gardez <strong>Keeeply</strong> toujours sous la main pour retrouver
        vos objets instantanément
      </p>
      {isIOS() && (
        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-3 my-3 text-xs text-gray-200">
          <div className="mb-2 flex items-center gap-2 text-white">
            <FaApple size={16} />
            <span className="font-medium">Installer Keeeply sur iPhone</span>
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

      <div className="flex items-center justify-end gap-2">
        {canInstall && (
          <Button
            onClick={promptInstall}
            label="Installer"
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
  );
}
