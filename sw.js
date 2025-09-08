self.addEventListener('install', event => {
    console.log('Installing [Service Worker]', event);
    event.waitUntil(
        caches.open('static')
          .then(cache => {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
              '/',
              '/index.html',
			  '/main.webmanifest.json',
               '/main.js',
              '/png/head.png',
              '/png/chewing_apple.mp3',
			  '/png/chewing_apple.wav',
			  '/png/head.ico',
              '/png/head-256.png',
              '/png/skin1.png',
			  '/png/2.glb',
			  '/Arial_Regular.json',
			  '/png/Apple.glb'
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