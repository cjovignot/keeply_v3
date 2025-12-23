import type { Step } from "../types";

const title = "Tableau de bord";

export const dashboardSteps: Step[] = [
  {
    selector: "#tutorial-dashboard-btn",
    title: title,
    message: "Bienvenue sur ton tableau de bord.",
    navigateTo: "/dashboard",
  },
  {
    selector: "#tutorial-dashboard-stats",
    title: title,
    message:
      "Ici tu peux suivre les statistiques de tes entrepôts grâce à divers indicateurs.",
  },
];
