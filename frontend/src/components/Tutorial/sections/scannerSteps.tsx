import type { Step } from "../types";

const title = "QrCode Scanner";

export const scannerSteps: Step[] = [
  {
    selector: "#tutorial-scanner-button",
    title: title,
    message: (
      <div>
        <div className="font-semibold mb-2 text-lg">
          🎉​ Bienvenue dans la fonctionnalité phare de Keeeply !
        </div>

        <div className="text-yellow-300">
          Le scanner de QrCode pour retrouver tes objets et bien plus encore…
        </div>
      </div>
    ),
    navigateTo: "/scan",
  },
  {
    selector: "#tutorial-scanner-lecture-button",
    title: title,
    message: (
      <>
        <div className="">
          <div className="font-semibold text-md mb-2">Mode lecture</div>
          <div className="flex flex-col gap-2">
            <div>
              • Ce mode permet de scanner un QrCode d'une boîte et d'en afficher
              le contenu directement !
            </div>
            <div>
              • Plus besoin de fouiller 10 minutes dans la boîte pour savoir ce
              qu'elle contient ! 😁​
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    selector: "#tutorial-scanner-stockage-button",
    title: title,
    message: (
      <>
        <>
          <div className="">
            <div className="font-semibold text-md mb-2">
              Mode stockage / déménagement
            </div>
            <div className="flex flex-col gap-2">
              <div>
                • Ce mode permet de scanner vos boîtes en série lors du stockage
                de vos boîtes.
              </div>
              <div>
                • Une fois toutes les boîtes scannées, choisissez l'entrepôt de
                destination puis validez.
              </div>
              <div>
                • Toutes les boîtes scannées sont désormais enregistrées dans
                l'entrepôt choisi !
              </div>
            </div>
          </div>
        </>
      </>
    ),
  },
];
