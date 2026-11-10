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
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'ModeLuxe Mart';
  const options = {
    body: (payload.notification && payload.notification.body) || 'Aapke account mein naya update hai.',
    icon: '/favicon.ico',
    data: payload.data || { url: '/' },
    tag: payload.data && payload.data.tag ? payload.data.tag : 'modeluxe-update'
  };
  self.registration.showNotification(title, options);
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
    for (const client of windows) { if ('focus' in client) { client.navigate(target); return client.focus(); } }
    return clients.openWindow(target);
  }));
});
