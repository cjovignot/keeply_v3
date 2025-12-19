import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "../contexts/useAuth";

type LinkItem = { label: string; to: string };
type Group = { label: string; links: LinkItem[] };

// ---------------------
// Liens solos (sans parent)
// ---------------------
const soloLinks: LinkItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Tableau de bord", to: "/dashboard" },
];

// ---------------------
// Groupes collapsables
// ---------------------
const groups: Group[] = [
  {
    label: "Gestion",
    links: [
      { label: "Mes boîtes", to: "/boxes" },
      { label: "Mes entrepôts", to: "/storages" },
    ],
  },
];

const LeftSidePanel = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  const toggle = (label: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Footer dynamique
  const footerLinks = !user
    ? [{ label: "Connexion", to: "/login" }]
    : [
        { label: "Profil", to: "/profile" },
        { label: "Paramètres", to: "/settings" },
      ];

  return (
    <div className="w-64 h-full bg-gray-900 text-gray-200 flex flex-col border-r border-gray-800">
      {/* HEADER */}
      <div className="px-3 py-4">
        <div className="text-4xl text-yellow-400 font-semibold mb-6 px-2">
          Keeeply
        </div>

        {/* SOLO LINKS */}
        {soloLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm rounded-md mb-2 ${
                isActive
                  ? "bg-gray-700 text-white font-medium"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* GROUPES */}
        {groups.map((group) => {
          const isOpen = openGroups[group.label];

          return (
            <div key={group.label} className="mb-4">
              <button
                onClick={() => toggle(group.label)}
                className="flex hover:cursor-pointer items-center justify-between w-full px-2 py-2 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition"
              >
                <span>{group.label}</span>
                {isOpen ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {group.links.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-4 py-1.5 text-sm rounded-md ${
                            isActive
                              ? "bg-gray-700 text-white font-medium"
                              : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mt-auto px-3 py-4 border-t border-gray-800">
        <div className="text-xs uppercase text-gray-500 mb-2 px-2">Compte</div>

        {footerLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-4 py-1.5 text-sm rounded-md ${
                isActive
                  ? "bg-gray-700 text-white font-medium"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSidePanel;
