import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
          className="w-full max-w-md mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400"
          >
            <ArrowLeft size={16} />
            Retour
          </button>

          <h1 className="mt-4 text-3xl font-semibold text-yellow-400">
            Politique de Confidentialité
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Comment nous collectons et utilisons tes données.
          </p>
        </motion.div>

        {/* CONTENT BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full max-w-md p-5 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl"
        >
          <div className="flex flex-col gap-6 text-gray-300 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                1. Informations collectées
              </h2>
              <p>
                Lorsque tu utilises l’authentification Google, nous récupérons
                uniquement :
              </p>

              <ul className="mt-2 ml-4 list-disc text-gray-400">
                <li>Ton nom et photo de profil Google</li>
                <li>Ton adresse e-mail</li>
              </ul>

              <p className="mt-2">
                Aucune autre donnée Google n’est consultée, stockée ou demandée.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                2. Utilisation des données
              </h2>
              <p>
                Ces informations servent uniquement à créer et gérer ton compte
                sur l’application. Nous ne vendons ni ne partageons jamais tes
                données.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                3. Stockage et sécurité
              </h2>
              <p>
                Tes données sont stockées de manière sécurisée et ne sont
                accessibles qu’au serveur de l’application pour permettre les
                fonctionnalités essentielles.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                4. Accès tiers
              </h2>
              <p>
                Aucun tiers n’a accès à tes données, sauf obligation légale.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                5. Suppression des données
              </h2>
              <p>
                Tu peux demander la suppression complète de ton compte et de tes
                informations en nous contactant à :
              </p>

              <p className="mt-2 text-yellow-400 font-medium">
keeeply-contact@gmail.com
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                6. Contact
              </h2>
              <p>
                Pour toute question concernant cette politique de
                confidentialité, tu peux nous contacter à :
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
