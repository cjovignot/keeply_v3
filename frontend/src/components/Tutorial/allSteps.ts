import { dashboardSteps } from "./sections/dashboardSteps";
import { boxesSteps } from "./sections/boxesSteps";
import { storagesSteps } from "./sections/storagesSteps";
import { scannerSteps } from "./sections/scannerSteps";
import { profileSteps } from "./sections/profileSteps";
import { printingSteps } from "./sections/printingSteps";

export const allTutorialSteps = [
  ...boxesSteps,
  ...storagesSteps,
  ...scannerSteps,
  // ...printingSteps,
  ...dashboardSteps,
  // ...profileSteps,
];
