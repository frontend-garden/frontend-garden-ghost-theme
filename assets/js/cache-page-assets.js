/**
 * Code inspired by https://github.com/ireade/offline-first-tutorial/blob/extra-local-storage/src/js/post/save-page.js
 */

/**
 * Cache dynamically versioned page assets.
 */
const APP_NAME = 'frontend-garden';
const PAGE_PATH = window.location.pathname;
const PAGE_NAME = `page-${PAGE_PATH === '/' ? 'homepage' : PAGE_PATH.replace(/\//g, '')}`;
const ASSETS_PATH = '/assets/';
const ASSETS_PATH_BUILT = `${ASSETS_PATH}built/`;
const PAGE_CACHE_NAME = `${APP_NAME}-${PAGE_NAME}`;

const areArticleAssetsInCache = () => caches.keys().then((keys) => keys.includes(PAGE_CACHE_NAME));

const removeArticleAssets = () => caches.delete(PAGE_CACHE_NAME);

const saveVersionedAssets = () => {
  caches.open(PAGE_CACHE_NAME).then((cache) => {
    const versionNumber = document.getElementsByClassName('js-versioned-asset')[0].href.split('?v')[1];
    const versionName = `v${versionNumber}`;
    const assets = [
      `${ASSETS_PATH_BUILT}css/main.min.css?${versionName}`,
      `${ASSETS_PATH}js/cache-page-assets.js?${versionName}`,
      `${ASSETS_PATH}js/main.js?${versionName}`,
      `${ASSETS_PATH}js/register-sw.js?${versionName}`,
    ];

    return cache.addAll([PAGE_PATH, ...assets]);
  });
};

if ('serviceWorker' in navigator && 'caches' in window) {
  /**
   * Update versioned assets.
   */
  window.addEventListener('load', () => {
    if (navigator.onLine) {
      areArticleAssetsInCache()
        .then((areArticleAssetsCached) => {
          if (areArticleAssetsCached) {
            removeArticleAssets();
          }
          saveVersionedAssets();
        });
    }
  });
}
