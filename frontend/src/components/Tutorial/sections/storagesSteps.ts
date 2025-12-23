import type { Step } from "../types";

const title = "Mes entrepôts";

export const storagesSteps: Step[] = [
  {
    selector: "#tutorial-storages-btn",
    title: title,
    message: "Voici la liste de tous tes lieus de stockage.",
    navigateTo: "/storages",
  },
  {
    selector: "#tutorial-storages-add",
    title: title,
    message: "Tu peux ajouter un nouvel entrepôt ici.",
  },
  {
    selector: "#tutorial-storages-search",
    title: title,
    message: "Tu peux chercher facilement un entrepôt par son nom.",
  },
  {
    selector: "#tutorial-storages-filters",
    title: title,
    message: "Actives un ou plusieurs filtres à ta recherche.",
  },
  {
    selector: "#tutorial-storages-delete",
    title: title,
    message: "Tu peux supprimer un entrepôt si tu le souhaites",
  },
];
