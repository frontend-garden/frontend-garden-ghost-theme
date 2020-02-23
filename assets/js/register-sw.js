if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    '/sw.js',
  )
    .then((registration) => {
      if (registration.waiting) {
        registration.update();
      }
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error('[Service worker] Oh, no. Registration of SW failed: ', error);
    });
}
