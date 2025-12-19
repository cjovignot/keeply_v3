import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { ArrowLeft, Save, Plus, Camera, ChevronDown } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { useApiMutation } from "../hooks/useApiMutation";
import { useAuth } from "../contexts/useAuth";
import Button from "../components/UI/Buttons";
import KeywordInput from "../components/UI/KeywordInput";

type Storage = {
  _id: string;
  name: string;
};

const BoxCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 🔹 Utilisation du contexte Auth

  // ============================
  // 🔹 Récupération des entrepôts
  // ============================
  const {
    data: storages,
    loading: loadingStorages,
    error,
  } = useApi<Storage[]>(user?._id ? `/storages?ownerId=${user._id}` : null);

  // ============================
  // 🔹 Mutation : création de boîte
  // ============================
  const { mutate: createBox, loading: creating } = useApiMutation<
    { success: boolean },
    void
  >("/boxes", "POST", {
    onSuccess: () => {
      alert("✅ Boîte créée avec succès !");
      navigate("/boxes");
    },
    onError: (err) => {
      console.error("Erreur création boîte :", err);
      alert("❌ Impossible de créer la boîte.");
    },
  });

  // ============================
  // 🔹 États du formulaire
  // ============================
  const [form, setForm] = useState({
    destination: "",
    storageId: "",
    width: "",
    height: "",
    depth: "",
    fragile: false,
  });

  const [contentItems, setContentItems] = useState<
    { name: string; quantity: number; picture: string; uploading?: boolean }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ============================
  // 🔹 Gestion du contenu
  // ============================
  const handleAddItem = () => {
    setContentItems([...contentItems, { name: "", quantity: 1, picture: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setContentItems(contentItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof (typeof contentItems)[0],
    value: string | number
  ) => {
    const updated = [...contentItems];
    updated[index] = { ...updated[index], [field]: value };
    setContentItems(updated);
  };

  const handleImageUpload = async (index: number, file: File) => {
    const updated = [...contentItems];
    updated[index].uploading = true;
    setContentItems(updated);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (data.secure_url) {
        updated[index].picture = data.secure_url;
      } else {
        console.error("Réponse Cloudinary invalide :", data);
        alert("❌ Erreur lors de l’upload de l’image.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau pendant l’upload.");
    } finally {
      updated[index].uploading = false;
      setContentItems([...updated]);
    }
  };

  // ============================
  // 🔹 Soumission du formulaire
  // ============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) return alert("Utilisateur non connecté.");

    const payload = {
      ...form,
      ownerId: user._id,
      content: contentItems,
      dimensions: {
        width: Number(form.width),
        height: Number(form.height),
        depth: Number(form.depth),
      },
    };

    await createBox(payload);
  };

  // ============================
  // 🔹 Rendu
  // ============================
  return (
    <PageWrapper>
      <div className="px-6 py-10 text-white">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer flex items-center gap-2 text-gray-400 hover:text-yellow-400"
          >
            <ArrowLeft size={20} /> Retour
          </button>
          <h1 className="text-xl font-bold text-yellow-400">Créer une boîte</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-2xl gap-2 p-4 mx-auto bg-gray-800 border border-gray-700 rounded-xl"
        >
          {/* Champs de base */}
          <KeywordInput
            value={form.destination}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, destination: value }))
            }
            category="location"
            placeholder="Destination"
            inputClassName="rounded-lg bg-gray-950 px-3 py-2 text-sm hover:bg-gray-700"
            suggestionsClassName="bg-gray-950 border-gray-600"
          />

          <div className="relative flex-3/5">
            <select
              name="storageId"
              value={form.storageId}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 text-sm text-white transition-colors border border-gray-700 rounded-lg appearance-none bg-gray-950 focus:outline-none focus:ring-1 focus:ring-yellow-400 hover:bg-gray-700"
            >
              <option value="">Sélectionnez un entrepôt</option>
              {loadingStorages ? (
                <option disabled>Chargement...</option>
              ) : error ? (
                <option disabled>Erreur de chargement</option>
              ) : (
                storages?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))
              )}
            </select>

            <ChevronDown
              size={16}
              className="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
            />
          </div>

          {/* Contenu dynamique */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-yellow-400 text-md">Contenu</h2>
              <Button
                onClick={handleAddItem}
                icon={Plus}
                size={28}
                variant="edit"
                className="fixed right-6 bottom-20"
              />
            </div>

            {contentItems.length === 0 && (
              <p className="text-sm text-gray-400">
                Aucun objet ajouté pour l’instant.
              </p>
            )}

            {contentItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-3 mt-2 border border-gray-700 rounded-lg bg-gray-950"
              >
                {/* Nom et quantité */}
                <div className="flex items-center gap-2">
                  <KeywordInput
                    value={item.name}
                    onChange={(value) => handleItemChange(index, "name", value)}
                    category="item"
                    placeholder="Nom de l’objet"
                    className="flex-1 w-3/4"
                    inputClassName="flex-1 w-3/4 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-400"
                    required
                  />

                  <input
                    type="number"
                    placeholder="Quantité"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-1/4 px-3 py-1 text-center bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-400"
                    required
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col items-center gap-2">
                  <label className="flex w-full items-center justify-center flex-1 gap-2 p-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700">
                    <Camera size={16} />
                    <span className="text-sm">
                      {item.picture ? "Changer la photo" : "Ajouter une photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(index, file);
                      }}
                    />
                  </label>

                  {(item.uploading || item.picture) && (
                    <div className="flex items-center justify-center overflow-hidden bg-gray-900 border border-gray-700 rounded-lg w-full h-auto">
                      {item.uploading ? (
                        <span className="text-xs text-yellow-400 animate-pulse">
                          Envoi...
                        </span>
                      ) : (
                        <img
                          src={item.picture}
                          alt="Aperçu"
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="flex-shrink-0 p-2 text-sm text-white bg-red-900 rounded-lg hover:text-red-400"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          {/* Dimensions */}
          <div className="flex gap-2 mt-4">
            {["longueur", "hauteur", "largeur"].map((dim) => (
              <input
                key={dim}
                type="number"
                name={dim}
                placeholder={`${dim} (cm)`}
                value={(form as any)[dim]}
                onChange={handleChange}
                className="w-1/3 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-1 focus:ring-yellow-400"
              />
            ))}
          </div>

          {/* Option Fragile */}
          <div className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              id="fragile"
              name="fragile"
              checked={form.fragile}
              onChange={(e) => setForm({ ...form, fragile: e.target.checked })}
              className="w-5 h-5 accent-yellow-400"
            />
            <label htmlFor="fragile" className="text-sm text-gray-300">
              Boîte fragile
            </label>
          </div>

          <Button
            type="submit"
            icon={Save}
            label="Créer la boîte"
            loadingLabel="Création..."
            size={18}
            variant="cta"
            disabled={creating}
          />
        </form>
      </div>
    </PageWrapper>
  );
};

export default BoxCreate;
