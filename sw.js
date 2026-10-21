// Lumi's tiny service worker: lets phones install her as a real fullscreen app. It just passes requests through.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { if (e.request.method === 'GET' && new URL(e.request.url).origin === location.origin) e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); });
