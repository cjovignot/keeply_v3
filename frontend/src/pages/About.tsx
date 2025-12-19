import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const About = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center px-6 py-10 text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400"
          >
            <ArrowLeft size={16} />
            Retour
          </button>

          <h1 className="mt-4 text-3xl font-semibold text-yellow-400">
            À propos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Présentation du projet et de ses principales fonctionnalités.
          </p>
        </motion.div>

        {/* Content (sans card scrollable) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full max-w-2xl"
        >
          <div className="space-y-6 text-sm leading-relaxed text-gray-300">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Qu’est-ce que Keeeply ?
              </h2>
              <p>
                <span className="text-yellow-400">Keeeply</span> est une
                application pensée pour simplifier l’organisation du stockage,
                des déménagements, des archives, ou de tout espace nécessitant
                une gestion claire et rapide. Elle centralise la gestion des
                entrepôts, des boîtes et des items, tout en facilitant la
                recherche, l’étiquetage et le suivi des objets.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Fonctionnalités clés
              </h2>
              <ul className="pl-5 mt-2 space-y-2 list-disc text-gray-400">
                <li>Créer / supprimer des entrepôts de stockage.</li>
                <li>
                  Gérer des boîtes : création, modification, suppression, ajout
                  d’items.
                </li>
                <li>
                  Ajouter une photo par item pour faciliter l’identification.
                </li>
                <li>
                  Visualiser les dimensions des boîtes et le volume occupé.
                </li>
                <li>
                  Imprimer des étiquettes avec QR code, libellé et icône «
                  fragile ».
                </li>
                <li>
                  Choisir un gabarit d’étiquettes et une zone de départ
                  d’impression.
                </li>
                <li>
                  Rechercher un objet et retrouver instantanément son
                  emplacement.
                </li>
                <li>
                  Scanner le QR d’une boîte pour afficher son contenu
                  immédiatement.
                </li>
                <li>
                  Mode « déménagement » : scanner en série les boîtes pour les
                  déplacer rapidement entre entrepôts.
                </li>
                <li>
                  Connexion via email/mot de passe ou Google OAuth2, avec
                  cookies de session pour la persistance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Conçu pour être pratique
              </h2>
              <p>
                L’interface met l’accent sur la rapidité et l’efficacité :
                scanning mobile optimisé, impression d’étiquettes simple,
                recherche instantanée, et gestion visuelle grâce aux photos.
                Keeeply aide à planifier, ranger et retrouver plus vite les
                objets, que ce soit pour un particulier, une entreprise ou un
                déménagement.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Sécurité et confidentialité
              </h2>
              <p>
                Keeeply utilise des cookies de session pour maintenir la
                connexion. Les données (comptes, entrepôts, boîtes, items,
                photos, préférences d’impression) sont stockées de manière
                sécurisée. Google OAuth2 peut être utilisé en complément de
                l’authentification classique pour simplifier l’accès.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Le créateur
              </h2>
              <p>
                Créé par <span className="text-yellow-400">Cosme Jovignot</span>
                , Keeeply est un projet né d’un besoin réel d’organisation et
                d’optimisation du stockage. Le retour des utilisateurs influence
                en permanence les améliorations, afin de rendre l’outil toujours
                plus efficace, intuitif et utile au quotidien.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Contact
              </h2>
              <p>
                Pour toute question, suggestion, demande de fonctionnalité ou
                retour utilisateur, vous pouvez écrire à :
                <br />
                <span className="text-yellow-400">
                  keeeply-contact@gmail.com
                </span>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default About;
