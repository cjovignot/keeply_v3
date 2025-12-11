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
      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: -600 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center h-30"
      >
        <img
          src={storageBoxes2}
          alt="Illustration stockage"
          className="w-full object-cover"
        />
      </motion.div>

      <div className="flex flex-col items-center px-6 pt-8 text-white">
        {/* =============================== */}
        {/* SECTION HERO */}
        {/* =============================== */}
        <section className="w-full max-w-4xl mt-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
            >
              Organisez, rangez et retrouvez vos objets… sans jamais chercher.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-300 mb-6 text-lg leading-relaxed"
            >
              Keeeply vous aide à reprendre le contrôle de votre espace.
              Photographiez, catégorisez, étiquetez avec QR code et retrouvez
              immédiatement où se trouve chaque objet. Fini les heures perdues.
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
        </section>

        {/* =============================== */}
        {/* FEATURES */}
        {/* =============================== */}
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center h-50 overflow-hidden"
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
              Créez, modifiez et gérez vos boîtes et leurs contenus. Ajoutez des
              photos pour chaque item.
            </p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center h-50 overflow-hidden"
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
              Imprimez des étiquettes QR code, scannez-les et retrouvez
              instantanément le contenu de chaque boîte.
            </p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center overflow-hidden"
            >
              <img
                src={qrCodePhone}
                alt="Illustration stockage"
                className="w-full mt-6 object-cover rounded-md"
              />
            </motion.div>
          </div>
        </section>

        {/* =============================== */}
        {/* SECTION COMMENT ÇA MARCHE */}
        {/* =============================== */}
        <section className="w-full max-w-4xl mt-20 mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-yellow-400 mb-10"
          >
            Comment ça marche ?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: 1,
                title: "Créez vos espaces",
                text: "Entrepôts, pièces, étagères, boîtes… vous structurez votre monde comme vous le souhaitez.",
              },
              {
                step: 2,
                title: "Ajoutez vos objets",
                text: "Photos, descriptions, quantité : tout est référencé clairement.",
              },
              {
                step: 3,
                title: "Étiquetez & scannez",
                text: "Un QR code par boîte et vous retrouvez instantanément ce qu’elle contient.",
              },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl h-full"
                >
                  <div className="text-yellow-400 text-4xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* =============================== */}
        {/* SECTION TIMELINE D'ONBOARDING */}
        {/* =============================== */}
        <section className="w-full max-w-4xl mt-10 mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-yellow-400 mb-12"
          >
            Votre onboarding en 60 secondes
          </motion.h2>

          <div className="relative border-l border-gray-700 pl-6">
            {[
              {
                title: "Créer votre premier entrepôt",
                text: "Vous nommez votre espace et ajoutez les premières boîtes.",
              },
              {
                title: "Ajouter des objets",
                text: "Photographiez, décrivez et catégorisez vos items.",
              },
              {
                title: "Imprimer vos QR codes",
                text: "Chaque boîte devient traçable instantanément.",
              },
              {
                title: "Scanner pour retrouver",
                text: "Vous scannez, Keeeply vous montre où se trouve chaque objet.",
              },
            ].map((item, i) => (
              <div key={i} className="mb-10 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="ml-4"
                >
                  <div className="w-4 h-4 bg-yellow-400 rounded-full mb-2" />
                  <h3 className="text-xl text-yellow-400 font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">{item.text}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* =============================== */}
        {/* SECTION TÉMOIGNAGES */}
        {/* =============================== */}
        <section className="w-full max-w-4xl mt-10 mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-yellow-400 mb-12"
          >
            Ils utilisent Keeeply
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Julien",
                text: "Keeeply m’a fait gagner un temps fou dans mon atelier. Je retrouve tout instantanément.",
              },
              {
                name: "Sophie",
                text: "J’ai enfin un inventaire clair pour mes stocks. Les QR codes, c’est magique.",
              },
              {
                name: "Marc",
                text: "J’ai rangé mon garage en un week-end. Keeeply m’a changé la vie.",
              },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg"
                >
                  <p className="text-gray-300 text-sm mb-4 italic">
                    "{item.text}"
                  </p>
                  <h4 className="text-yellow-400 font-semibold">{item.name}</h4>
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =============================== */}
      {/* FOOTER */}
      {/* =============================== */}
      <footer className="w-full px-6">
        <div className="w-full flex justify-center mb-6">
          <div className="w-full h-[1px] bg-gray-400 opacity-70"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center py-5">
          <div className="grid grid-cols-2 justify-center gap-2 text-gray-400 text-xs mb-6">
            <Link
              to="/regles_de_confidentialite"
              className="hover:text-yellow-400 transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              to="/conditions_d_utilisation"
              className="hover:text-yellow-400 transition-colors"
            >
              Conditions d'utilisation
            </Link>
            <Link
              to="/a_propos"
              className="hover:text-yellow-400 transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/mentions_legales"
              className="hover:text-yellow-400 transition-colors"
            >
              Mentions légales
            </Link>
          </div>

          <div className="w-full flex justify-center mb-6">
            <div className="w-20 h-[1px] bg-yellow-400 opacity-70"></div>
          </div>

          <p className="text-center text-yellow-400 text-sm">
            © {new Date().getFullYear()} Keeeply -- Tous droits réservés
          </p>
        </div>
      </footer>
    </PageWrapper>
  );
}
