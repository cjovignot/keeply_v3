import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BoxItemSkeleton from "../components/BoxItemSkeleton";
import BoxItem from "../components/BoxItem";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowUpDown,
  ArrowDownUp,
  ChevronDown,
  AlertTriangle,
  Boxes as StorageIcon,
} from "lucide-react";
import { useAuth } from "../contexts/useAuth";
import Button from "../components/UI/Buttons";
import {
  searchKeywords,
  addDynamicWords,
  loadDictionary,
} from "../utils/keywords";

type ContentItem = {
  name: string;
  quantity: number;
  picture?: string;
};

type Box = {
  _id: string;
  ownerId: string;
  storageId: string;
  number: string;
  content: ContentItem[];
  fragile: boolean;
  destination: string;
  qrcodeURL: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
};

type Storage = {
  _id: string;
  name: string;
};

// ---------- Imports restent les mêmes ----------

const Boxes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [boxes, setBoxes] = useState<Box[] | null>(null);
  const [storages, setStorages] = useState<Storage[] | null>(null);
  const [search, setSearch] = useState("");
  const [sortByNumber, setSortByNumber] = useState<"asc" | "desc" | null>("asc");
  const [filterFragile, setFilterFragile] = useState<"all" | "fragile" | "nonFragile">("all");
  const [filterStorage, setFilterStorage] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dictionaryReady, setDictionaryReady] = useState(false);

  // ---------- Chargement du dictionnaire ----------
  useEffect(() => {
    const initDictionary = async () => {
      await loadDictionary();
      setDictionaryReady(true);
    };
    initDictionary();
  }, []);

  // ---------- Filtrage / suggestions ----------
  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (value.trim().length < 2 || !dictionaryReady) {
      setSuggestions([]);
      return;
    }

    setSuggestions(searchKeywords(value));
    setShowSuggestions(true);
  };

  // ---------- Enrichissement dynamique ----------
  useEffect(() => {
    if (!boxes || boxes.length === 0) return;

    const words = new Set<string>();
    boxes.forEach((box) => {
      box.content.forEach((item) => {
        if (!item.name) return;
        item.name
          .toLowerCase()
          .split(/[\s,.;:/()]+/)
          .forEach((word) => {
            if (word.length > 2) words.add(word);
          });
      });
    });

    addDynamicWords([...words]);
  }, [boxes]);

  // ---------- Fetch boxes ----------
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const res = await fetch(`${API_URL}/boxes?ownerId=${user._id}`);
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        setBoxes(data);
      } catch (err) {
        console.error(err);
        setBoxes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxes();
  }, [API_URL, user._id]);

  // ---------- Fetch storages ----------
  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const res = await fetch(`${API_URL}/storages?ownerId=${user._id}`);
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        setStorages(data);
      } catch (err) {
        console.error(err);
        setStorages([]);
      }
    };
    fetchStorages();
  }, [API_URL, user._id]);

  // ---------- Suppression boîte ----------
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette boîte ?")) return;
    try {
      const res = await fetch(`${API_URL}/boxes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBoxes((prev) => prev?.filter((b) => b._id !== id) || []);
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer la boîte.");
    }
  };

  // ---------- Header scroll ----------
  useEffect(() => {
    const updateOffset = () => {
      if (contentRef.current && headerRef.current) {
        contentRef.current.style.paddingTop = `${headerRef.current.offsetHeight + 16}px`;
      }
    };
    updateOffset();

    const ro = new ResizeObserver(updateOffset);
    if (headerRef.current) ro.observe(headerRef.current);

    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateOffset);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  const getStorageName = (id: string) =>
    storages?.find((s) => s._id === id)?.name || "Inconnu";

  const safeBoxes = Array.isArray(boxes) ? boxes : [];
  const safeStorages = Array.isArray(storages) ? storages : [];

  const filteredBoxes = safeBoxes
    .filter((box) =>
      search === ""
        ? true
        : box.content.some((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
    )
    .filter((box) => {
      if (filterFragile === "fragile") return box.fragile;
      if (filterFragile === "nonFragile") return !box.fragile;
      return true;
    })
    .filter((box) => {
      if (filterStorage === "all") return true;
      if (filterStorage === "none") return !box.storageId;
      return box.storageId === filterStorage;
    })
    .sort((a, b) =>
      sortByNumber === "asc"
        ? a.number.localeCompare(b.number)
        : b.number.localeCompare(a.number)
    );

  // ---------- Render ----------
  if (!user?._id) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-white">
          <h2 className="mb-4 text-2xl font-bold text-yellow-400">Vous n’êtes pas connecté</h2>
          <p className="mb-6 text-center text-gray-400">
            Pour consulter vos boîtes, merci de créer un compte ou de vous connecter.
          </p>
          <Button onClick={() => navigate("/login")} label="Se connecter / Créer un compte" variant="cta" fullWidth />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="relative min-h-screen text-white">
        {/* ---------- Header ---------- */}
        <div
          ref={headerRef}
          className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b transition-all ${
            !scrolled ? "bg-gray-950/40 backdrop-blur-md border-gray-700" : "bg-gray-950 border-gray-800"
          }`}
        >
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mt-2 mb-2 text-2xl font-semibold text-yellow-400">
            Mes boîtes
          </motion.h1>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher par objet…"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                onFocus={() => search && setShowSuggestions(true)}
                className="w-full px-4 py-1 bg-gray-800 border border-gray-700 rounded-full"
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-xl">
                  {suggestions.map((word) => (
                    <button
                      key={word}
                      type="button"
                      onMouseDown={() => {
                        setSearch(word);
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={() => navigate("/boxes/new")} icon={Plus} size={18} variant="edit" />
          </div>
        </div>

        {/* ---------- Contenu ---------- */}
        <main ref={contentRef} className="max-w-4xl px-6 pb-20 mx-auto">
          {loading ? (
            <div className="pt-2 space-y-4">
              {[...Array(6)].map((_, i) => (
                <BoxItemSkeleton key={i} />
              ))}
            </div>
          ) : filteredBoxes.length === 0 ? (
            <p className="pt-20 text-center text-gray-500">Aucune boîte trouvée.</p>
          ) : (
            <div className="pt-2 space-y-4">
              {filteredBoxes.map((box) => (
                <BoxItem key={box._id} box={box} onClick={() => navigate(`/box/boxdetails/${box._id}`)} onDelete={() => handleDelete(box._id)} getStorageName={getStorageName} />
              ))}
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default Boxes;