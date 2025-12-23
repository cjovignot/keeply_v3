import type { Step } from "../types";

const title = "Impression des étiquettes";

export const printingSteps: Step[] = [
  {
    selector: "#tutorial-print-menu",
    title: title,
    message: (
      <div className="">
        Ouverture et fermeture du menu d'impression avec compteur du nombre de
        boîtes sélectionnées pour l'impression.
      </div>
    ),
    navigateTo: "/boxes",
  },
  {
    selector: "#tutorial-print-selection-play",
    title: title,
    message: (
      <div className="">
        Démarrage/Arrêt de la sélection multiple depuis la page "Mes boîtes".
      </div>
    ),
  },
  {
    selector: "#tutorial-print-layout",
    title: title,
    message: (
      <div className="flex flex-col gap-1 mb-6">
        <div className="">• Configuration de la planche d'étiquettes</div>
        <div>• Choix du format de la planche.</div>
        <div>• Choix du placement de la première étiquette.</div>
        <div className="flex w-full justify-center italic mt-6">
          "Chez Keeeply, on évite le gaspillage !"
        </div>
      </div>
    ),
  },
  {
    selector: "#tutorial-print-reset",
    title: title,
    message: (
      <div className="">Réinitialisation des étiquettes sélectionnées.</div>
    ),
    navigateTo: "/printgroup",
  },
  {
    selector: "#tutorial-print-start",
    title: title,
    message: (
      <div className="">
        🚀​ Démarrage de l'impression depuis votre navigateur.
      </div>
    ),
    navigateTo: "/printgroup",
  },
];
