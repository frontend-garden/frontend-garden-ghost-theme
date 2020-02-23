/* Unfortunately, `eslint-config-airbnb` disallows the use of `self` (global variable referring to
`ServiceWorkerGlobalScope`) with the `no-restricted-globals` rule. It feels more like a flaw of
ESlint itself so we turn off the rule in this file. For more information read
https://github.com/airbnb/javascript/issues/1632. */

/* eslint no-restricted-globals: 0 */

const APP_NAME = 'frontend-garden';
const CACHE_VERSION = 1;
const ASSETS_PATH_BUILT = '/assets/built/';
const OFFLINE_URL = '/offline/';
const PRECACHE_ASSETS = [
  OFFLINE_URL,
  '/content/images/2019/05/icon.svg',
  `${ASSETS_PATH_BUILT}css/main.min.css`,
];
const PRECACHE_NAME = `${APP_NAME}-precache-v${CACHE_VERSION}`;

const isHtmlPage = (event) => event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html');

const isAssetToCache = (asset) => {
  const isAssetWithVersionNumber = asset.url.includes('/assets/') && asset.url.includes('?v');
  return (
    !(asset.url.includes('www.google-analytics.com') || isAssetWithVersionNumber)
  );
};

const updateCache = (cacheName) => {
  const isPreCacheAsset = cacheName.includes('precache') && cacheName !== PRECACHE_NAME;
  return isPreCacheAsset && caches.delete(cacheName);
};

/**
 * Cache data from PRECACHE_ASSETS.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then((cache) => {
        cache.addAll(PRECACHE_ASSETS);
      }),
  );
});

/**
 * Update service worker and remove old cache, if it's necessary.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(cacheNames.map(
        (currentCacheName) => updateCache(currentCacheName),
      ))),
  );
});

/**
 * Return cached asset if exists.
 * Cache asset if isn't in cache.
 */
self.addEventListener('fetch', (event) => {
  const asset = event.request;
  event.respondWith(
    caches.match(asset)
      .then((cachedResponse) => cachedResponse || fetch(asset).then(
        (response) => {
          if (isAssetToCache(asset)) {
            const responseToCache = response.clone();
            caches.open(PRECACHE_NAME)
              .then((cache) => {
                cache.put(asset, responseToCache);
              });
          }
          return response;
        },
      )
        .catch((error) => {
          if (isHtmlPage(event)) {
            return caches.match(OFFLINE_URL);
          }
          return error;
        })),
  );
});
