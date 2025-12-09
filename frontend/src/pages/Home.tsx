import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import storageBoxes from "../assets/storage_boxes.jpg";
import storageBoxes2 from "../assets/storage_boxes_2.jpg";
import mysteryBox from "../assets/boite_mystere.jpg";
import qrCodePhone from "../assets/qr_code_smartphone.jpg";

export default function Home() {
  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: -600 }}
        animate={{ opacity: 1, y: -0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center h-40"
      >
        <img
          src={storageBoxes2}
          alt="Illustration stockage"
          className="w-full object-cover rounded-md"
        />
      </motion.div>
      <div className="flex flex-col items-center px-6 pt-10 text-white">
        {/* Hero */}
        <section className="w-full max-w-4xl mt-6 grid md:grid-cols-2 gap-10 items-center">
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
                  className="flex items-center gap-2 px-6 py-2 text-black font-medium bg-yellow-400 rounded-full hover:bg-yellow-500"
                >
                  Commencer maintenant <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <img
              src={mysteryBox}
              alt="Illustration stockage"
              className="w-full object-cover rounded-xl"
            />
          </motion.div> */}
        </section>

        {/* Features */}
        <section className="w-full max-w-4xl mt-12 mb-14 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Gestion d'entrepôts
            </h3>
            <p className="text-gray-300 text-sm">
              Créez et organisez vos entrepôts. Visualisez l’espace utilisé et
              optimisez vos volumes.
            </p>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center h-50"
            >
              <img
                src={storageBoxes}
                alt="Illustration stockage"
                className="w-full mt-6 object-cover rounded-md"
              />
            </motion.div>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Boîtes & items
            </h3>
            <p className="text-gray-300 text-sm">
              Créez, modifiez et gérez vos boîtes et leurs contenus, ajoutez des
              photos pour chaque item.
            </p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center h-50"
            >
              <img
                src={mysteryBox}
                alt="Illustration stockage"
                className="w-full mt-6 object-cover rounded-xl"
              />
            </motion.div>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Étiquettes QR intelligentes
            </h3>
            <p className="text-gray-300 text-sm">
              Imprimez des étiquettes avec QR code et logo fragile, scannez-les
              pour retrouver instantanément le contenu.
            </p>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
              <img
                src={qrCodePhone}
                alt="Illustration stockage"
                className="w-full mt-6 object-cover rounded-md"
              />
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
<footer className="w-full mt-20 px-6">
  <div className="max-w-4xl mx-auto py-10">

    <div className="flex justify-center gap-4 text-gray-400 text-sm mb-6">
      <Link to="/regles_de_confidentialite" className="hover:text-yellow-400 transition-colors">
        Confidentialité
      </Link>
      <Link to="/conditions_d_utilisation" className="hover:text-yellow-400 transition-colors">
        Conditions
      </Link>
      <Link to="/a_propos" className="hover:text-yellow-400 transition-colors">
        À propos
      </Link>
      <Link to="/mentions_legales" className="hover:text-yellow-400 transition-colors">
        Mentions légales
      </Link>
    </div>

    <div className="w-full flex justify-center mb-6">
      <div className="w-20 h-[1px] bg-yellow-400 opacity-70"></div>
    </div>

    <p className="text-center text-yellow-400 text-sm">
      © {new Date().getFullYear()} Keeply -- Tous droits réservés
    </p>
  </div>
</footer>
    </PageWrapper>
  );
}
