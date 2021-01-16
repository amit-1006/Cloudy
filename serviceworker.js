const CACHE_NAME="version-1";
const urlsToCache=["index.html","offline.html"];

const self=this;

//installation of SW
self.addEventListener('install',((event)=>{
      event.waitUntill(
          caches.open(CACHE_NAME)
          .then((cache)=>{
              console.log("cache opened");
              return cache.addAll(urlsToCache);
          })
      )
}));


//fetch or listen to requests
self.addEventListener('fetch',((event)=>{

    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
             .catch(()=>caches.match("offline.html"))
        })
    )

}));

//activate SW
self.addEventListener('activate',((event)=>{

const cacheWhiteList=[];
cacheWhiteList.push(CACHE_NAME);

event.waitUntill(
    caches.keys()
    .then((cacheName)=>{
        Promise.all(
            cacheName.map((names)=>{
                if(!cacheWhiteList.includes(names)){
                    return caches.delete(names);
                }
            })
        )
    })
)



}))