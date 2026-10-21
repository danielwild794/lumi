// Lumi's tiny service worker: lets phones install her as a real fullscreen app, and always fetches her newest
// version straight from the site (skipping the browser's 10-minute cache) so updates show up the next time she opens.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request)));
});
