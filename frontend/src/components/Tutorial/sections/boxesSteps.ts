import type { Step } from "../types";

const title = "Mes boîtes";

export const boxesSteps: Step[] = [
  {
    selector: "#tutorial-boxes-btn",
    title: title,
    message: "Voici la liste de toutes tes boîtes.",
    navigateTo: "/boxes",
  },
  {
    selector: "#tutorial-boxes-add",
    title: title,
    message: "Tu peux ajouter une nouvelle boîte ici.",
  },
  {
    selector: "#tutorial-boxes-search",
    title: title,
    message: "Tu peux chercher facilement un objet parmi toutes tes boîtes.",
  },
  {
    selector: "#tutorial-boxes-filters",
    title: title,
    message: "Actives un ou plusieurs filtres à ta recherche.",
  },
  {
    selector: "#tutorial-boxes-toDetail",
    title: title,
    message: "Accèdes au détail d'une boîte en cliquant dessus.",
  },
];
