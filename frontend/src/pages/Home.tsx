import { motion } from "framer-motion";
import { ArrowRight, Box, Layers, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import storageBoxes from "../assets/storage_boxes.jpg";
import storageBoxes2 from "../assets/storage_boxes_2.jpg";
import mysteryBox from "../assets/boite_mystere.jpg";
import qrCodePhone from "../assets/qr_code_smartphone.jpg";

export default function Home() {
  return (
    <PageWrapper>
      {/* HEADER IMAGE */}
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

        {/* HERO */}
        <section className="w-full max-w-4xl mt-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
            >
              Enfin une façon simple et moderne d’organiser votre vie
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-300 mb-6 text-lg"
            >
              Keeply transforme le chaos en clarté. Gérez vos entrepôts, vos boîtes
              et tous vos objets en quelques secondes. Scannez un QR code et retrouvez
              immédiatement ce que vous cherchez. Retrouver devient naturel.
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

        {/* FEATURES */}
        <section className="w-full max-w-4xl mt-12 mb-14 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">
              Une vision claire de tous vos espaces
            </h3>
            <p className="text-gray-300 text-sm">
              Créez vos entrepôts, visualisez votre capacité en un clin d’œil et
              optimisez chaque mètre carré. Keeply rend l’organisation naturelle.
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
              Vos boîtes… et tout ce qu’elles contiennent
            </h3>
            <p className="text-gray-300 text-sm">
              Ajoutez vos boîtes, leurs objets, leurs photos. Chaque chose
              retrouve enfin une place, et chaque objet devient accessible.
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
              Scannez, retrouvez, respirez
            </h3>
            <p className="text-gray-300 text-sm">
              Vos étiquettes QR intelligentes vous donnent un accès immédiat aux
              contenus de chaque boîte. Un scan, et tout devient évident.
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

        {/* COMMENT ÇA MARCHE */}
        <section className="w-full max-w-4xl mt-4 mb-14">
          <h2 className="text-yellow-400 text-3xl font-bold text-center mb-8">
            Comment ça marche ?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Layers size={40} />,
                title: "1. Créez vos espaces",
                text: "Entrepôts, garage, pièce, cave… un clic suffit."
              },
              {
                icon: <Box size={40} />,
                title: "2. Ajoutez vos boîtes",
                text: "Classez-les, nommez-les, ajoutez des photos."
              },
              {
                icon: <QrCode size={40} />,
                title: "3. Scannez & retrouvez",
                text: "Un QR code = un accès instantané au contenu."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-900 border border-gray-800 rounded-xl text-center shadow-xl"
              >
                <div className="flex justify-center text-yellow-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-yellow-400">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm mt-2">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIMELINE ONBOARDING */}
        <section className="w-full max-w-4xl mt-4 mb-20">
          <h2 className="text-yellow-400 text-3xl font-bold text-center mb-10">
            Votre onboarding, étape par étape
          </h2>

          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-700 -z-10"></div>

            <div className="grid md:grid-cols-5 gap-10">
              {[
                "Créer un espace",
                "Ajouter vos boîtes",
                "Ajouter vos objets",
                "Imprimer vos QR",
                "Scanner & retrouver"
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black font-semibold shadow-md mb-3">
                    {i + 1}
                  </div>
                  <p className="text-gray-300 text-sm">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION TÉMOIGNAGES */}
        <section className="w-full max-w-4xl mb-20">
          <h2 className="text-yellow-400 text-3xl font-bold text-center mb-8">
            Ils utilisent déjà Keeply
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Thomas, artisan",
                text: ""Keeply a transformé mon atelier. Je sais enfin où sont mes outils et mes pièces. Un gain de temps énorme.""
              },
              {
                name: "Claire, maman de 2 enfants",
                text: ""Entre la cave, le garage et les boîtes de souvenirs, c’était le chaos. Aujourd’hui tout est clair, simple et accessible.""
              },
              {
                name: "Julien, collectionneur",
                text: ""Chaque objet est photographié, indexé et accessible via un scan. Keeply est devenu indispensable.""
              },
              {
                name: "Emma, responsable stock",
                text: ""On a gagné en efficacité dès la première semaine. Les erreurs de rangement ont littéralement disparu.""
              }
            ].map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-lg"
              >
                <p className="text-gray-300 text-sm italic mb-4">{t.text}</p>
                <p className="text-yellow-400 text-sm font-semibold">-- {t.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="w-full px-6">
        <div className="max-w-4xl mx-auto text-center py-10">
          <div className="flex flex-col justify-center gap-3 text-gray-400 text-sm mb-6">
            <Link to="/regles_de_confidentialite" className="hover:text-yellow-400 transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/conditions_d_utilisation" className="hover:text-yellow-400 transition-colors">
              Conditions d'utilisation
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