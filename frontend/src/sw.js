// public/sw.js
const CACHE_VERSION = "__APP_VERSION__"; // remplacée par Vite à chaque build
const CACHE_NAME = `keeeply-cache-${CACHE_VERSION}`;
const ASSETS = ["/", "/index.html", "/favicon.ico", "/main.js", "/main.css"];

// Installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
