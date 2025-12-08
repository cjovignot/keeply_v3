import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const LegalMentions = () => {
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
            Mentions légales
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Informations légales concernant l’éditeur, l’hébergement et la
            protection des données.
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
                Éditeur du site
              </h2>
              <p>
                Le site et l’application sont édités par{" "}
                <span className="text-yellow-400">[Nom du projet]</span>.<br />
                Responsable de la publication :{" "}
                <span className="text-yellow-400">Cosme Jovignot</span>.<br />
                Adresse : <span className="text-yellow-400">[Ton adresse]</span>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Hébergement
              </h2>
              <p>
                L’application est hébergée et déployée via Vercel. Pour toute
                question liée à l’hébergement, contactez :{" "}
                <span className="text-yellow-400">support@vercel.com</span>.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Objet du service
              </h2>
              <p>
                L’application permet la gestion d’espaces de stockage :
                création/suppression d’entrepôts, gestion de boîtes et d’items,
                impression d’étiquettes (QR + label + icône fragile), ajout de
                photos d’items, calcul de volume des boîtes, recherche d’objets,
                et fonctionnalité de scan QR pour lister ou déplacer des boîtes
                (mode déménagement).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Données et sécurité
              </h2>
              <p>
                Les données liées à votre compte et au contenu (entrepôts,
                boîtes, items, photos, gabarits d’impression, logs de scan) sont
                stockées sur nos serveurs. Nous mettons en œuvre des mesures
                raisonnables pour assurer la sécurité et la confidentialité des
                données.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Authentification et cookies
              </h2>
              <p>
                L’accès à l’application peut s’effectuer via email/mot de passe
                ou Google OAuth2. Nous utilisons des cookies de session pour
                maintenir la connexion et faciliter l’expérience
                (authentification, préférences d’impression, gestion de
                session). Ces cookies sont nécessaires au fonctionnement normal
                du service.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Traitement des images
              </h2>
              <p>
                Les photos ajoutées aux items sont stockées et associées aux
                boîtes correspondantes afin de permettre la consultation et
                l’impression si besoin. Veillez à ne pas uploader d’images
                contenant des données sensibles sans précautions.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Durée de conservation
              </h2>
              <p>
                Les données des comptes et contenus sont conservées tant que le
                compte existe ou jusqu’à demande de suppression. Des sauvegardes
                temporaires peuvent être conservées selon nos politiques
                internes.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Propriété intellectuelle
              </h2>
              <p>
                Le code, l’interface, les logos et contenus fournis par
                l’éditeur restent sa propriété. Toute reproduction ou
                réutilisation sans autorisation est interdite.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Limitation de responsabilité
              </h2>
              <p>
                L’éditeur ne saurait être tenu responsable en cas de perte de
                données, perte d’accès, mauvaise utilisation du service, ou
                incidents indépendants de sa volonté (pannes d’hébergeur,
                interruption réseau, etc.).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Contact
              </h2>
              <p>
                Pour exercer vos droits (accès, rectification, suppression) ou
                toute question juridique, contactez :{" "}
                <span className="text-yellow-400">tonemail@example.com</span>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default LegalMentions;
