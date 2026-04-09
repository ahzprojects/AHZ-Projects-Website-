const CACHE_NAME = 'awakening-alliance-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/scripts.js',
  '/assets/images/favicon/favicon-32x32.png',
  '/assets/images/favicon/favicon-16x16.png',
  '/assets/images/favicon/apple-touch-icon.png',
  '/assets/images/candice.png',
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .catch(error => console.error('Failed to cache assets on install:', error))
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .catch(error => console.error('Failed to delete old caches on activate:', error))
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => cacheResponse || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});

// Handle message event to update the service worker
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});