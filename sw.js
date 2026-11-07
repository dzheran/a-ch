const C="shashky-v7",A=["./","index.html","manifest.json","manifest.en.json"];
self.addEventListener("install",e=>{e.waitUntil(Promise.all(A.map(u=>caches.open(C).then(c=>c.add(u)).catch(()=>{}))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{
  const n=fetch(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>r);
  return r||n}))});
