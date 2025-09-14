self.addEventListener('install', event => {
    console.log('Installing [Service Worker]', event);
    event.waitUntil(
        caches.open('static')
          .then(cache => {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
              '/',
              '/index.html',
			  '/manifest.json',
              '/main-out.js',
              '/favicon.ico',
              '/icons/icon-192x192.png',
              '/icons/icon-512x512.png',
              '/chewing_apple.wav',
			  '/Arial_Regular.json',
			  '/helvetiker_regular.typeface.json'
            ]);
          }));
  });
self.addEventListener('activate', event => {
  console.log('SW now ready to handle fetches!');
});
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          } else {
            return fetch(event.request);
          }
        })
    );
});