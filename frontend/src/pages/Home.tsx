import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center px-6 py-10 text-white">
        {/* Hero */}
        <section className="w-full max-w-4xl mt-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
            >
              Organisez, stockez et retrouvez vos objets facilement
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-300 mb-6 text-lg"
            >
              Keeply vous permet de gérer vos entrepôts, boîtes et items,
              d’imprimer des étiquettes avec QR code et de retrouver vos objets
              en un instant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/login">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 text-black font-medium bg-yellow-400 rounded-full hover:bg-yellow-500"
                >
                  Commencer maintenant <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md">
              <img
                src="/assets/illustration-storage.png"
                alt="Illustration stockage"
                className="w-full object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="w-full max-w-4xl mt-24 mb-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Gestion d'entrepôts
            </h3>
            <p className="text-gray-300 text-sm">
              Créez et organisez vos entrepôts. Visualisez l’espace utilisé et
              optimisez vos volumes.
            </p>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Boîtes & items
            </h3>
            <p className="text-gray-300 text-sm">
              Créez, modifiez et gérez vos boîtes et leurs contenus, ajoutez des
              photos pour chaque item.
            </p>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Étiquettes QR intelligentes
            </h3>
            <p className="text-gray-300 text-sm">
              Imprimez des étiquettes avec QR code et logo fragile, scannez-les
              pour retrouver instantanément le contenu.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-yellow-400 text-sm">
        © {new Date().getFullYear()} Keeply — Tous droits réservés
      </footer>
    </PageWrapper>
  );
}
