// Récupère la version depuis la build (remplacée par Vite ou ton bundler)
const CACHE_VERSION = "__APP_VERSION__"; // Exemple : "1.0.3"
const CACHE_NAME = `keeeply-cache-${CACHE_VERSION}`;

// Ressources à mettre en cache
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/sw.js",
  "/assets/logo.png",
  // ajoute ici toutes les ressources statiques critiques
];

// Installation
self.addEventListener("install", (event) => {
  console.log("🟢 Service Worker installé :", CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activation
self.addEventListener("activate", (event) => {
  console.log("🟢 Service Worker activé :", CACHE_NAME);
  // Supprime les anciens caches
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Gestion du message "SKIP_WAITING" pour mise à jour immédiate
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
