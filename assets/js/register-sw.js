if ('serviceWorker' in navigator) {
  // Adam 2020/06/17:
  // Temporarily disabled SW until page caching issues are resolved.
  // navigator.serviceWorker.register(
  //   '/sw.js',
  // )
  //   .then((registration) => {
  //     if (registration.waiting) {
  //       registration.update();
  //     }
  //   })
  //   .catch((error) => {
  //     // eslint-disable-next-line
  //     console.error('[Service worker] Oh, no. Registration of SW failed: ', error);
  //   });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        for (let i = 0; i < registrations.length; i += 1) {
          registrations[i].unregister();
        }
      });
  }
}
