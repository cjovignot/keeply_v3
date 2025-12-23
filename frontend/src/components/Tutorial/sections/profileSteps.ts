import type { Step } from "../types";

const title = "Profil & pages additionnelles";

export const profileSteps: Step[] = [
  {
    selector: "#tutorial-profile-button",
    title: title,
    message: "Ceci est ton espace profil.",
    navigateTo: "/profile",
  },
];
