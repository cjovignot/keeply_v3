// frontend/src/pages/Storages.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import {
  Trash,
  Plus,
  ArrowUpDown,
  ArrowDownUp,
  ChevronDown,
} from "lucide-react";
import StorageSkeleton from "../components/StorageSkeleton";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../contexts/useAuth";
import axiosClient from "../api/axiosClient";
import Button from "../components/UI/Buttons";
import KeywordInput from "../components/UI/KeywordInput";
import { useLayout } from "../hooks/useLayout";

type Storage = {
  _id: string;
  name: string;
  address: string;
  boxes: { id: string; label: string }[];
  ownerId: string;
};

const Storages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<"name" | "boxCount">("name");
  const [ascending, setAscending] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { isMobile } = useLayout();

  // 🚨 Aucun utilisateur connecté
  if (!user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-white">
          <h2 className="mb-4 text-2xl font-bold text-yellow-400">
            Vous n’êtes pas connecté
          </h2>
          <p className="mb-6 text-center text-gray-400">
            Pour consulter vos entrepôts, merci de créer un compte ou de vous
            connecter.
          </p>
          <Button
            onClick={() => navigate("/login")}
            label="Se connecter / Créer un compte"
            variant="cta"
            fullWidth
          />
        </div>
      </PageWrapper>
    );
  }

  // 🔹 Hook pour récupérer les entrepôts uniquement si user est défini
  const {
    data: storagesData,
    loading,
    error,
    refetch,
  } = useApi<Storage[]>(user ? `/storages?ownerId=${user._id}` : null);

  // 🔹 Assurer que storages est toujours un tableau
  const storages = Array.isArray(storagesData) ? storagesData : [];

  // --- Filtrage & tri ---
  const filtered = storages
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortMode === "name") {
        return ascending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return ascending
        ? (a.boxes?.length ?? 0) - (b.boxes?.length ?? 0)
        : (b.boxes?.length ?? 0) - (a.boxes?.length ?? 0);
    });

  // --- Ajustement padding contenu ---
  const updateContentOffset = () => {
    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    if (contentRef.current) {
      contentRef.current.style.paddingTop = `${headerHeight + 16}px`;
    }
  };

  useEffect(() => {
    updateContentOffset();
    const ro = new ResizeObserver(updateContentOffset);
    if (headerRef.current) ro.observe(headerRef.current);

    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("resize", updateContentOffset);
    window.addEventListener("scroll", onScroll);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateContentOffset);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // --- Suppression d’un entrepôt ---
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("🗑️ Supprimer cet entrepôt ?");
    if (!confirmDelete) return;

    try {
      const res = await axiosClient.delete(`/storages/${id}`);
      refetch?.();
      alert("✅ Entrepôt supprimé avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("❌ Impossible de supprimer l’entrepôt.");
    }
  };

  return (
    <PageWrapper>
      <div className="relative min-h-screen text-white">
        {/* ---------- Header ---------- */}
        <div
          ref={headerRef}
          className={`
    ${isMobile ? "fixed left-0 right-0 top-0" : "fixed left-64 right-0 top-0"}
    z-50 px-6 py-4 border-b transition-all duration-200
    ${
      !scrolled
        ? "bg-gray-950/40 backdrop-blur-md shadow-lg border-gray-700"
        : "bg-gray-950 border-gray-800"
    }
  `}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mb-2"
          >
            <h1 className="mt-2 text-2xl font-semibold text-yellow-400">
              Mes entrepôts
            </h1>
          </motion.div>

          <div className="flex gap-3">
            <KeywordInput
              id="tutorial-storages-search"
              value={search}
              onChange={setSearch}
              placeholder="Rechercher par nom..."
              className="flex-1"
            />

            <div id="tutorial-storages-add">
              <Button
                onClick={() => navigate("/storages/new")}
                icon={Plus}
                size={18}
                variant="edit"
              />
            </div>
          </div>

          <div
            id="tutorial-storages-filters"
            className="flex items-center justify-between gap-3 mt-3"
          >
            <div className="relative flex-3/5">
              <select
                value={sortMode}
                onChange={(e) =>
                  setSortMode(e.target.value as "name" | "boxCount")
                }
                className="w-full px-3 py-2 pr-10 text-sm text-white transition-colors bg-gray-800 border border-gray-700 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 hover:bg-gray-700"
              >
                <option value="name">Nom de l'entrepôt</option>
                <option value="boxCount">Nombre de boîtes</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
              />
            </div>

            <button
              onClick={() => setAscending(!ascending)}
              className="flex items-center justify-center gap-2 px-2 py-2 text-sm transition-colors bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              {ascending ? (
                <ArrowUpDown size={16} />
              ) : (
                <ArrowDownUp size={16} />
              )}
            </button>
          </div>
        </div>

        {/* ---------- Contenu ---------- */}
        <main
          ref={contentRef}
          className={` px-6 pb-20 mx-auto ${
            isMobile ? "max-w-4xl" : "max-w-full"
          }`}
        >
          {loading ? (
            <div className="pt-2 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <StorageSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="pt-20 text-center text-gray-500">
              Aucun entrepôt trouvé.
            </p>
          ) : (
            <div
              className={`pt-2 ${
                !isMobile ? "grid grid-cols-3 gap-4" : " space-y-4"
              }`}
            >
              {filtered.map((storage) => (
                <div
                  key={storage._id} // 🔹 assure clé unique
                  className="flex flex-col p-4 bg-gray-800 border border-gray-700 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-yellow-400">
                      {storage.name}
                    </h2>

                    <div className="flex items-center gap-3">
                      {/* <button
                        onClick={() =>
                          navigate(`/storages/edit/${storage._id}`)
                        }
                        className="p-2 transition-colors rounded hover:bg-gray-700"
                      >
                        <Pencil size={18} />
                      </button> */}
                      <button
                        id="tutorial-storages-delete"
                        onClick={() => handleDelete(storage._id)}
                        className="p-2 transition-colors rounded hover:bg-red-700"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">{storage.address}</p>

                  <div className="mt-3 text-sm text-gray-300">
                    <span className="font-medium text-yellow-400">
                      {storage.boxes?.length ?? 0}
                    </span>{" "}
                    boîte(s)
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="pb-6 mt-10 text-sm text-center text-gray-500">
            Liste de vos entrepôts.
          </p>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Storages;
