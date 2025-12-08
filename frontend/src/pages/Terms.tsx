import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Terms = () => {
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
            Conditions d’Utilisation
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Les règles encadrant l’utilisation de l’application.
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
                1. Acceptation des Conditions
              </h2>
              <p>
                En utilisant cette application (« l’App »), vous acceptez
                pleinement et sans réserve les présentes Conditions Générales
                d’Utilisation (CGU). Si vous n’acceptez pas ces conditions, vous
                ne devez pas utiliser l’App.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                2. Accès au Service
              </h2>
              <p>
                Le service est fourni « tel quel », sans garantie
                d’accessibilité continue. L’App peut être modifiée, suspendue ou
                arrêtée à tout moment sans préavis.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                3. Compte Utilisateur
              </h2>
              <p>
                Pour accéder à certaines fonctionnalités, vous devez créer un
                compte ou vous connecter via Google OAuth. Vous êtes responsable
                de l’exactitude des informations fournies et de la sécurité de
                vos identifiants.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                4. Utilisation Autorisée
              </h2>
              <p>Vous vous engagez à ne pas utiliser l’App pour :</p>
              <ul className="pl-5 mt-2 space-y-1 list-disc text-gray-400">
                <li>tenter d’accéder à des données non autorisées ;</li>
                <li>perturber le bon fonctionnement du service ;</li>
                <li>
                  utiliser l’App à des fins frauduleuses, illégales ou
                  malveillantes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                5. Données Personnelles
              </h2>
              <p>
                L’utilisation de vos données est détaillée dans notre Politique
                de Confidentialité. En utilisant l’App, vous acceptez la
                collecte minimale d’informations nécessaire au fonctionnement
                (email, profil Google si login via OAuth).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                6. Propriété Intellectuelle
              </h2>
              <p>
                Tous les contenus, éléments visuels, logos, textes et
                fonctionnalités sont la propriété exclusive du développeur de
                l’App, sauf mention contraire.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                7. Limitation de Responsabilité
              </h2>
              <p>L’éditeur de l’App ne pourra être tenu responsable :</p>
              <ul className="pl-5 mt-2 space-y-1 list-disc text-gray-400">
                <li>de toute perte de données ;</li>
                <li>
                  de tout préjudice résultant d’un usage inapproprié du service
                  ;
                </li>
                <li>
                  de toute interruption temporaire ou permanente du service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                8. Suppression du Compte
              </h2>
              <p>
                Vous pouvez à tout moment demander la suppression de votre
                compte en nous contactant. La suppression est définitive et
                entraîne la perte des données associées.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                9. Modifications des Conditions
              </h2>
              <p>
                Nous pouvons mettre à jour ces CGU à tout moment. En continuant
                d’utiliser l’App après une modification, vous acceptez les
                nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                10. Contact
              </h2>
              <p>
                Pour toute question concernant ces Conditions, vous pouvez nous
                contacter à :
                <span className="text-yellow-400"> tonemail@example.com</span>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Terms;
