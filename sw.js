const CACHE = 'library-v13';
const ASSETS = ['/', '/index.html', '/app.js', '/style.css', '/manifest.json', '/icon.svg', '/hero.jpg',
  '/IMG_20211217_130258.jpg', '/IMG_20220315_114652.jpg', '/IMG_20220619_213007.jpg', '/IMG_20220620_224031.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request)
      .then(r => r || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});
