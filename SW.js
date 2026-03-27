// CACHE NAME
const cacheName = 'paschala-v1';
const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/391920b5313be4a92336a4b7a0dd3e54.jpg',
    '/manifest.json'
];

// INSTALL SERVICE WORKER
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(assets))
            .then(() => self.skipWaiting())
    );
});

// ACTIVATE SERVICE WORKER & CLEAN OLD CACHES
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if(key !== cacheName) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

// FETCH EVENT - SERVE CACHE FIRST
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => res || fetch(e.request).catch(() => caches.match('/index.html')))
    );
});