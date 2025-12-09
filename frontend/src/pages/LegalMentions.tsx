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
                Éditeur du site
              </h2>
              <p>
                Le site et l’application sont édités par{" "}
                <span className="text-yellow-400">Keeeply</span>.<br />
                Responsable de la publication :{" "}
                <span className="text-yellow-400">Cosme Jovignot</span>.<br />
                Adresse :{" "}
                <span className="text-yellow-400">
                  (à compléter)
                </span>.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Hébergement
              </h2>
              <p>
                L’application est hébergée et déployée via Vercel. Pour toute
                question liée à l’hébergement, vous pouvez contacter :{" "}
                <span className="text-yellow-400">support@vercel.com</span>.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Objet du service
              </h2>
              <p>
                L’application permet la gestion d’espaces de stockage :
                création et suppression d’entrepôts, gestion de boîtes et
                d’items, impression d’étiquettes (QR + label + icône fragile),
                ajout de photos d’objets, calcul de volume, recherche
                d’objets et fonction de scan QR pour lister ou déplacer des
                boîtes (mode déménagement).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Données et sécurité
              </h2>
              <p>
                Les données liées au compte (entrepôts, boîtes, items, photos,
                gabarits d’impression, logs de scan) sont stockées sur des
                serveurs sécurisés. Nous appliquons des mesures raisonnables
                pour en assurer la protection et la confidentialité.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Authentification et cookies
              </h2>
              <p>
                L’accès à l’application peut s’effectuer via email/mot de passe
                ou Google OAuth2. Des cookies de session sont utilisés afin de
                maintenir l’authentification, de gérer les préférences
                d’impression et d’assurer le fonctionnement normal du service.
                Ces cookies sont indispensables au bon usage de l’application.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Traitement des images
              </h2>
              <p>
                Les photos ajoutées aux items sont enregistrées et associées aux
                boîtes correspondantes pour faciliter leur consultation ou leur
                impression. Merci de ne pas télécharger d’images contenant des
                données sensibles ou personnelles.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Durée de conservation
              </h2>
              <p>
                Les données sont conservées tant que le compte existe ou jusqu’à
                demande explicite de suppression. Certaines sauvegardes
                temporaires peuvent être conservées en fonction de nos politiques
                internes de sécurité.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Propriété intellectuelle
              </h2>
              <p>
                Le code de l’application, l’interface, les logos et tous les
                contenus fournis restent la propriété exclusive de l’éditeur.  
                Toute reproduction, modification ou réutilisation est interdite
                sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Limitation de responsabilité
              </h2>
              <p>
                L’éditeur ne peut être tenu responsable en cas de perte de
                données, de mauvaise utilisation du service, d’interruption
                réseau, de pannes d’hébergement ou de tout incident indépendant
                de sa volonté.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                Contact
              </h2>
              <p>
                Pour toute question, ou pour exercer vos droits (accès,
                rectification, suppression), vous pouvez nous contacter à :{" "}
                <span className="text-yellow-400">
                  keeeply-contact@gmail.com
                </span>.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default LegalMentions;