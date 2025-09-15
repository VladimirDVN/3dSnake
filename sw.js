self.addEventListener('install', event => {
    console.log('Installing [Service Worker]', event);
    event.waitUntil(
        caches.open('static')
          .then(cache => {
            console.log('[Service Worker] Precaching App Shell');
            // ВАЖНО: относительные пути для GitHub Pages (без ведущего "/")
            return cache.addAll([
              './',
              'index.html',
              'manifest.json',
              'main-out.js',
              'favicon.ico',
              'icons/icon-192x192.png',
              'icons/icon-512x512.png',
              'chewing_apple.wav',
              'Arial_Regular.json',
              'helvetiker_regular.typeface.json'
            ]);
          })
          .then(() => self.skipWaiting())
    );
});
self.addEventListener('activate', event => {
  console.log('SW now ready to handle fetches!');
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
    const request = event.request;

    // Навигационные запросы → отдаем index.html из кэша (SPA навигация офлайн)
    if (request.mode === 'navigate') {
      event.respondWith(
        caches.match('index.html').then(cached => cached || fetch(request))
      );
      return;
    }

    // Статика → Cache First
    event.respondWith(
      caches.match(request).then(response => response || fetch(request))
    );
});