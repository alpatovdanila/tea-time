if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('/tea-time/dev-sw.js?dev-sw', {
    scope: '/tea-time/',
    type: 'classic',
  })
