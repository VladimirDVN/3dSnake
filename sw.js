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
              '/favicon.ico',
              '/main.js',
              '/modules/lee.js',
              '/modules/modelSnake.js',
              '/png/apple.png',
              '/png/body.png',
              '/png/grass.png',
              '/png/head.png',
              '/png/sand.png',
              '/png/stone.png',
              '/png/stones.png',
              '/png/tail.png',
              '/png/turn.png',
              '/png/chewing_apple.mp3',
			  '/png/chewing_apple.wav',
			  '/png/snake16.png',
              '/png/d64.png',
              '/png/d192.png',
			  '/png/d512.png'
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