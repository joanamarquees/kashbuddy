const CACHE_NAME = 'kashbuddy-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/404.html',
  '/manifest.json',
  '/icon.png'
  // Note: CSS and JS files with hashes should ideally be handled by a build-time PWA plugin
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // For navigation requests, try to serve index.html from cache if fetch fails
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // If a file like an image is missing offline, we could return 404.html here
          // but usually we just let it fail.
          if (event.request.destination === 'image') {
            return caches.match('/icon.png');
          }
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});