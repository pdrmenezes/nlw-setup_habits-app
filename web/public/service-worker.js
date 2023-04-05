self.addEventListener('push', (event) => {
  const body = event.date?.text() ?? ''

  event.waitUntil(self.ServiceWorkerRegistration.showNotification('Habits', {
    body: 'Teste de notificação push'
  }))
})