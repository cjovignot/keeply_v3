import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Privacy = () => {
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
            Politique de Confidentialité
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Comment nous collectons, stockons et utilisons tes données.
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
                1. Informations collectées
              </h2>
              <p>
                Lors de l’utilisation de l’authentification Google, nous
                collectons uniquement les informations suivantes :
              </p>

              <ul className="mt-2 ml-4 list-disc text-gray-400">
                <li>Ton nom et ta photo de profil Google</li>
                <li>Ton adresse e-mail</li>
              </ul>

              <p className="mt-2">
                Aucune autre donnée Google n’est récupérée, stockée ou
                consultée. Nous ne demandons aucun accès supplémentaire à ton
                compte Google.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                2. Utilisation des données
              </h2>
              <p>
                Les informations collectées servent uniquement à créer, gérer et
                sécuriser ton compte sur l’application. Nous ne vendons jamais
                tes données, et nous ne les partageons avec aucun tiers à des
                fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                3. Stockage et sécurité
              </h2>
              <p>
                Tes données sont stockées de manière sécurisée et ne sont
                accessibles qu’aux serveurs nécessaires au bon fonctionnement de
                l’application. Des mesures techniques et organisationnelles sont
                mises en place afin de garantir la confidentialité et
                l’intégrité de tes informations.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                4. Accès tiers
              </h2>
              <p>
                Aucun tiers n’a accès à tes données, sauf en cas d’obligation
                légale ou de demande judiciaire valide.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                5. Suppression des données
              </h2>
              <p>
                Tu peux demander la suppression complète de ton compte et de tes
                données personnelles à tout moment en envoyant un e-mail à :
              </p>

              <p className="mt-2 text-yellow-400 font-medium">
                keeeply-contact@gmail.com
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                6. Contact
              </h2>
              <p>
                Pour toute question, demande d’information ou exercice de tes
                droits liés à la protection des données (accès, rectification,
                suppression), tu peux nous contacter à :
              </p>

              <p className="mt-2 text-yellow-400 font-medium">
                keeeply-contact@gmail.com
              </p>
            </section>
          </div>
        </motion.div>

        <p className="mt-10 text-sm text-center text-gray-500">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>
    </PageWrapper>
  );
};

export default Privacy;
