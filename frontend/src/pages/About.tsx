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
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400"
          >
            <ArrowLeft size={16} />
            Retour
          </button>

          <h1 className="mt-4 text-3xl font-semibold text-yellow-400">
            À propos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Présentation du projet et des fonctionnalités principales.
          </p>
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl overflow-y-auto max-h-[75vh]"
        >
          <div className="space-y-6 text-sm leading-relaxed text-gray-300">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Qu’est-ce que Keeeply ?
              </h2>
              <p>
                <span className="text-yellow-400">Keeeply</span> est un outil de
                gestion de stockage pensé pour simplifier la vie lors de
                déménagements, archives ou stockage d’objets personnels et
                professionnels. Il centralise l’organisation des entrepôts, des
                boîtes et des items, et facilite la recherche, l’étiquetage et
                le suivi des contenus.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Fonctionnalités clés
              </h2>
              <ul className="pl-5 mt-2 space-y-2 list-disc text-gray-400">
                <li>
                  Créer / supprimer des entrepôts pour organiser vos espaces de
                  stockage.
                </li>
                <li>
                  Créer, modifier et supprimer des boîtes, gérer le contenu
                  (items) de chaque boîte.
                </li>
                <li>
                  Ajouter une photo par item pour faciliter l’identification
                  visuelle.
                </li>
                <li>
                  Connaître les dimensions des boîtes et calculer le volume
                  utilisé par entrepôt.
                </li>
                <li>
                  Imprimer des étiquettes A4 avec QR code, libellé, et logo «
                  fragile » si nécessaire.
                </li>
                <li>
                  Paramétrer le gabarit d’étiquettes préféré et l’emplacement de
                  départ d’impression pour éviter le gaspillage.
                </li>
                <li>
                  Rechercher un objet pour savoir dans quel entrepôt et dans
                  quelle boîte il se trouve.
                </li>
                <li>
                  Scanner le QR code d’une boîte pour afficher directement son
                  contenu sans l’ouvrir.
                </li>
                <li>
                  Mode « déménagement » : scanner en série les boîtes pour les
                  déplacer rapidement d’un entrepôt à un autre lors de la
                  livraison.
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
                L’interface privilégie la rapidité et la clarté : scanning
                mobile, impression d’étiquettes optimisée, et recherche
                instantanée pour retrouver un objet en quelques secondes.
                L’ajout de photos et le calcul de volume aident à mieux gérer
                l’espace et à planifier les déménagements ou le rangement.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Sécurité et confidentialité
              </h2>
              <p>
                L’application utilise des cookies de session pour maintenir les
                connexions et stocke les données utilisateurs (comptes,
                entrepôts, boîtes, items, photos, préférences d’impression) de
                manière sécurisée. L’authentification via Google OAuth2 est
                disponible en complément de l’authentification classique.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Le créateur
              </h2>
              <p>
                Développé par{" "}
                <span className="text-yellow-400">Cosme Jovignot</span>, ce
                projet mêle expérience technique et besoin terrain (organisation
                d’espaces et gestion d’objets). Les retours des utilisateurs
                orientent continuellement les améliorations du produit.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Contact
              </h2>
              <p>
                Pour signaler un bug, demander une fonctionnalité, donner votre
                avis ou exercer vos droits sur vos données, contactez-moi :
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
