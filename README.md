ModeLuxe Delivery Queue Update

Files:
1. ModeLuxe-Order-Sync-Worker-QUEUE-UPDATED.js
   Replace the complete code in the existing Cloudflare Worker with this file.

2. Delivery-Panel-QUEUE-UPDATED.html
   Replace the existing Delivery Panel HTML with this file and publish the site.

Important:
- Keep existing Cloudflare secrets, including FIREBASE_SERVICE_ACCOUNT_JSON and other configured secrets.
- Before publishing Firebase Realtime Database Rules, verify that the new Worker and Delivery Panel are deployed together.
- Do not expose deliveryAssignments customer details through broad read permissions.
