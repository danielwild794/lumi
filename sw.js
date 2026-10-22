// Lumi's tiny service worker: lets phones install her as a real fullscreen app, and always fetches her newest
// version straight from the site (skipping the browser's 10-minute cache) so updates show up the next time she opens.
// Her recorded voice lines and her sound pack have a version in their path, so those are kept after the first download.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.includes('/sfx/')) {
    e.respondWith(caches.open('lumi-sfx').then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }))));
    return;
  }
  if (u.pathname.includes('/voice/')) {
    e.respondWith(caches.open('lumi-voice').then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }))));
    return;
  }
  e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request)));
});
