/* eslint-disable implicit-arrow-linebreak */
const CACHE_NAME = 'cache-v1';
const urlsToCache = ['index.html', '404.html'];
const self = this;
// install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache)),
  );
});

// listen for request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // cache hit - return response
        if (response) {
          return response;
        }
        // cache miss - return fetch promise
        return fetch(event.request);
      }).catch(() =>
        // fallback to offline page
        caches.match('offline.html')),
  );
});
