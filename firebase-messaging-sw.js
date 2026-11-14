/* ModeLuxe Mart Firebase Messaging service worker */
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBu5BiTQssyHdRBQXi2vmlZRGYby-SuSiQ",
  authDomain: "vaishu-modeluxe-mart.firebaseapp.com",
  databaseURL: "https://vaishu-modeluxe-mart-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vaishu-modeluxe-mart",
  storageBucket: "vaishu-modeluxe-mart.firebasestorage.app",
  messagingSenderId: "467862693441",
  appId: "1:467862693441:web:49998f19ec7bb87ac5c8c0"
});

const messaging = firebase.messaging();

// Handles background push notifications when the app is closed or locked
messaging.onBackgroundMessage((payload) => {
  const notif = payload.notification || {};
  const title = notif.title || "📦 ModeLuxe Mart: New Order!";
  const options = {
    body: notif.body || "Aapke paas ek naya order aaya hai.",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: 'modeluxe-order-alert',
    vibrate: [300, 100, 300, 100, 300],
    requireInteraction: true,
    data: payload.data || { url: './Seller-Panel.html' }
  };

  self.registration.showNotification(title, options);
});

// Opens the appropriate panel when the notification is clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './Seller-Panel.html';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes('Seller-Panel') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(new URL(targetUrl, self.location.origin).href);
      }
    })
  );
});
