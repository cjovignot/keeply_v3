// // src/tutorial/tutorialSteps.ts
// export interface Step {
//   selector: string;
//   message: string;
//   navigateTo?: string;
//   action?: () => void;
//   autoNext?: boolean;
// }

// export const tutorialSteps: Step[] = [
//   {
//     selector: "#tutorial-boxes-btn",
//     message: "Retrouves toutes tes boîtes stockées",
//     navigateTo: "/boxes",
//   },
//   {
//     selector: "#tutorial-storages-btn",
//     message: "Retrouves tous tes entrepôts",
//     navigateTo: "/storages",
//   },
//   {
//     selector: "#tutorial-dashboard-btn",
//     message:
//       "Tableau de bord personnel regroupant des statistiques sur ton stockage",
//     navigateTo: "/dashboard",
//   },
//   {
//     selector: "#tutorial-profile-btn",
//     message: "Clique sur ton profil pour voir les infos",
//     navigateTo: "/profile",
//   },
//   {
//     selector: "#tutorial-logout-button",
//     message: "Maintenant, clique sur ce bouton pour te déconnecter",
//     action: () => document.querySelector("#logout-button")?.click(),
//     autoNext: true,
//   },
//   {
//     selector: "#tutorial-settings-link",
//     message: "Enfin, tu peux aller dans les paramètres",
//     navigateTo: "/settings",
//   },
// ];
