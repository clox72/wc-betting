// ═══════════════════════════════════════════════════════════════
// Firebase Cloud Messaging service worker
// Handles push notifications when the app tab is closed or backgrounded.
// Must be hosted at the root of the site (same level as index.html)
// for the default FCM scope to work correctly.
// ═══════════════════════════════════════════════════════════════

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBqTCa6GVQi2OEoRHaY5836tDdqgqvzTuw",
  authDomain: "wc-betting-c6bb4.firebaseapp.com",
  projectId: "wc-betting-c6bb4",
  storageBucket: "wc-betting-c6bb4.firebasestorage.app",
  messagingSenderId: "782331354453",
  appId: "1:782331354453:web:9d931470906ee3008be3dc"
});

var messaging = firebase.messaging();

// Background message handler — fires when a push arrives and no tab
// has focus. Foreground messages (tab open and focused) are instead
// handled by onMessage() in index.html, so this avoids double-notifying.
messaging.onBackgroundMessage(function(payload) {
  var notification = payload.notification || {};
  var title = notification.title || "The House Always Bets";
  var options = {
    body: notification.body || "",
    icon: "https://www.gstatic.com/firebasejs/icon.png",
    badge: "https://www.gstatic.com/firebasejs/icon.png"
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if ("focus" in clientList[i]) return clientList[i].focus();
      }
      if (clients.openWindow) return clients.openWindow("./");
    })
  );
});
