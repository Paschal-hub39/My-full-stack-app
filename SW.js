const cacheName = 'paschala-v1';
const assets = ['/', 'index.html', 'style.css', 'script.js', '391920b5313be4a92336a4b7a0dd3e54.jpg'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
