const CACHE='wallet-shell-v4';
const ASSETS=['./','./index.html','./style.css','./app.js','./core.js','./manifest.webmanifest','./icon-glass-180.png','./icon-glass-192.png','./icon-glass-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('wallet-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>r.ok?r:caches.match('./index.html')).catch(()=>caches.match('./index.html')));return}if(ASSETS.some(p=>new URL(p,location.href).pathname===u.pathname))e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)))});
