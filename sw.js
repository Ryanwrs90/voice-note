// Offline shell: network first so updates show up right away; fall back to cache when offline.
const CACHE = 'voice-note-v2';
const SHELL = ['./', 'index.html', 'style.css', 'app.js', 'db.js', 'manifest.webmanifest', 'icon.svg', 'icon-180.png', 'version.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // no-cache: revalidate with the server so GitHub Pages' 10-min HTTP cache can't serve an old build.
  e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
