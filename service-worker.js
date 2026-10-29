const CACHE_NAME = "quran-site-v3";
const APP_FILES = [
  "./",
  "./index.html",
  "./about.html",
  "./contact.html",
  "./doaa.html",
  "./motawfy.html",
  "./nabawya.html",
  "./question.html",
  "./sabah.html",
  "./surah.html",
  "./css/style.css",
  "./css/all.css",
  "./javascript/script.js",
  "./javascript/surah.js",
  "./javascript/quran.json",
  "./manifest.json",
  "./القرآن حياتنا.jfif",
  "./Quran karim.jfif",
  "./القرآن الكريم.jfif",
  "./القرآن الكريم (1).jfif",
  "./ق1.jfif",
  "./download (7).jfif",
  "./webfonts/fa-brands-400.eot",
  "./webfonts/fa-brands-400.svg",
  "./webfonts/fa-brands-400.ttf",
  "./webfonts/fa-brands-400.woff",
  "./webfonts/fa-brands-400.woff2",
  "./webfonts/fa-regular-400.eot",
  "./webfonts/fa-regular-400.svg",
  "./webfonts/fa-regular-400.ttf",
  "./webfonts/fa-regular-400.woff",
  "./webfonts/fa-regular-400.woff2",
  "./webfonts/fa-solid-900.eot",
  "./webfonts/fa-solid-900.svg",
  "./webfonts/fa-solid-900.ttf",
  "./webfonts/fa-solid-900.woff",
  "./webfonts/fa-solid-900.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith("quran-site-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // For pages, try the network first so deployed edits show up; use cached copy offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match("./index.html")))
    );
    return;
  }

  // For styles/scripts/data/images, use cached files offline and refresh cache in background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
      return cached || network;
    })
  );
});
