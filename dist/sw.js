const CACHE='wallet-shell-v5';
const ASSETS=['./','./index.html','./style.css?v=5','./app.js?v=5','./core.js?v=5','./manifest.webmanifest','./icon-glass-180.png','./icon-glass-192.png','./icon-glass-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('wallet-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put('./index.html',r.clone());return r}return await caches.match('./index.html')||r}).catch(()=>caches.match('./index.html')));return;
 }
 if(!ASSETS.some(p=>new URL(p,location.href).pathname===u.pathname))return;
 e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put(e.request,r.clone())}return r}).catch(()=>caches.match(e.request)));
});
