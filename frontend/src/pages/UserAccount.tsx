import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useApiMutation } from "../hooks/useApiMutation";
import Button from "../components/UI/Buttons";

const UserAccount = () => {
  const { user, setUser, logout } = useAuth()!;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const getInitials = (name: string | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // ==============================
  // 🔹 PATCH - Update User
  // ==============================
  const { mutate: updateUser, loading: updating } = useApiMutation(
    `/user/${user?._id}`,
    "PATCH",
    {
      onSuccess: (res) => {
        setUser(res.user ?? res);
        alert("✅ Profil mis à jour !");
        navigate("/profile");
      },
      onError: () => {
        alert("Erreur lors de la mise à jour.");
      },
    }
  );

  // ==============================
  // 🔹 DELETE - Supprimer User
  // ==============================
  const { mutate: deleteUser, loading: deleting } = useApiMutation(
    `/user/${user?._id}`,
    "DELETE",
    {
      onSuccess: () => {
        logout();
        alert("🗑️ Compte supprimé !");
        navigate("/register");
      },
      onError: () => {
        alert("❌ Erreur lors de la suppression du compte.");
      },
    }
  );

  const handleDeleteAccount = () => {
    if (!user?._id) return alert("Utilisateur introuvable.");

    const ok = confirm(
      "❌ Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible."
    );
    if (!ok) return;

    deleteUser();
  };

  const handleSave = () => {
    updateUser(formData);
  };

  if (!user) return null;

  return (
    <PageWrapper>
      <div className="flex flex-col items-center px-6 py-10 text-white">
        <button
          onClick={() => navigate(-1)}
          className="hover:cursor-pointer flex items-center self-start gap-2 mb-6 text-sm text-gray-400 hover:text-yellow-400"
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        <motion.div className="w-full max-w-md p-6 text-center bg-gray-900 border border-gray-800 shadow-lg rounded-2xl">
          <div className="flex justify-center mb-4">
            {user.name && (
              <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-yellow-400 bg-gray-900 border-2 border-yellow-400 rounded-full shadow-md">
                {getInitials(user.name)}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3 mt-8 text-left">
            <label className="text-sm text-gray-400">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-full focus:border-yellow-400"
            />

            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-full focus:border-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Button
              onClick={handleSave}
              icon={Save}
              label="Enregistrer les modifications"
              size={18}
              variant="cta"
              disabled={updating}
            />

            <Button
              label="Supprimer mon compte"
              loadingLabel="Suppression..."
              onClick={handleDeleteAccount}
              icon={Trash2}
              size={18}
              disabled={deleting}
              variant="cta_danger"
            />
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default UserAccount;
