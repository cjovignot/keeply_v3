import { NavLink, useNavigate } from "react-router-dom";
import {
  ChartNoAxesCombined,
  User,
  ScanQrCode,
  KeyRound,
  Box,
  Warehouse,
} from "lucide-react";
import { useAuth } from "../contexts/useAuth";

const LeftSideNav = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const navItemsTop = [
    {
      to: "/boxes",
      icon: <Box size={20} />,
      label: "Boîtes",
    },
    {
      to: "/storages",
      icon: <Warehouse size={20} />,
      label: "Entrepôts",
    },
  ];

  const navItemsBottom = !user
    ? [
        {
          to: "/login",
          icon: <KeyRound size={20} />,
          label: "Connexion",
        },
      ]
    : [
        {
          to: "/dashboard",
          icon: <ChartNoAxesCombined size={20} />,
          label: "Dashboard",
        },
        {
          to: "/profile",
          icon: (
            <div className="relative">
              <User size={22} strokeWidth={0.75} />
              <span className="absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-gray-900"></span>
            </div>
          ),
          label: "Profil",
        },
      ];

  return (
    <aside className="hidden md:flex absolute h-screen w-64 flex-col border-r border-gray-800 bg-gray-950">
      {/* Logo / Titre */}
      <div className="px-4 py-5 text-lg font-semibold text-yellow-400">
        Keeeply
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 px-2 space-y-1">
        {navItemsTop.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Actions bas */}
      <div className="px-2 pb-4 space-y-1">
        {navItemsBottom.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}

        {/* Scan (action rapide desktop) */}
        <button
          onClick={() => navigate("/scan")}
          className="flex items-center gap-3 w-full px-3 py-2 mt-3 text-yellow-400 border border-yellow-400/40 rounded-lg hover:bg-yellow-400/10"
        >
          <ScanQrCode size={20} />
          Scanner
        </button>
      </div>
    </aside>
  );
};

export default LeftSideNav;
