import type { Step } from "../types";

const title = "Navigation";

export const navigationSteps: Step[] = [
  {
    selector: "#tutorial-profile-button",
    title: title,
    message: "Ceci est ton espace profil.",
    navigateTo: "/profile",
  },
];
