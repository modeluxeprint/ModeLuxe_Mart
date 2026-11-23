ModeLuxe Mart - Return Pickup Update

Files:
1. Admin-Panel-UPDATED.html
2. Delivery-Panel-UPDATED.html
3. Seller-Panel-UPDATED.html
4. ModeLuxe-Order-Sync-Worker-UPDATED.js

Important:
- Admin Login / OTP / Passkey code ko touch nahi kiya gaya.
- Normal deliveryQueue, deliveryAssignments, deliveryClaims aur normal delivery claim/status logic ko alag rakha gaya hai.
- Return pickup ke liye alag nodes hain:
  returnPickupQueue
  returnPickupAssignments
  returnPickupClaims
  returnPickupRejections
- Admin Return Approve karega to alag returnPickupQueue entry create hogi.
- Delivery partner Return Pickup accept kar sakta hai; first-claim-wins Worker logic use hota hai.
- Delivery partner Product Picked Up aur Product Received mark kar sakta hai.
- Refund Initiated / Refund Completed ka Admin-side action abhi is update mein include nahi hai.

Deployment:
1. Worker JS ko Cloudflare Worker mein existing code ki jagah deploy karein. Existing Worker secrets/vars ko preserve karein; FIREBASE_SERVICE_ACCOUNT_JSON aur ADMIN_UIDS ko remove/change na karein.
2. HTML files ko apne GitHub Pages repo mein corresponding current files ke naam se replace karein.
3. Firebase RTDB rules mein delivery partners ko returnPickupQueue read permission aur unke own returnPickupAssignments read permission deni hogi. Worker service account writes server-side karta hai.

Example rules fragment (existing rules ke andar merge karein; poori rules file replace na karein):
"returnPickupQueue": {
  ".read": "auth != null && root.child('deliveryProfiles').child(auth.uid).exists() && (root.child('deliveryProfiles').child(auth.uid).child('applicationStatus').val() === 'approved' || root.child('deliveryProfiles').child(auth.uid).child('status').val() === 'approved' || root.child('deliveryProfiles').child(auth.uid).child('applicationStatus').val() === 'active' || root.child('deliveryProfiles').child(auth.uid).child('status').val() === 'active')",
  ".write": false
},
"returnPickupAssignments": {
  "$orderId": {
    ".read": "auth != null && data.child('deliveryUid').val() === auth.uid",
    ".write": false
  }
},
"returnPickupClaims": { ".read": false, ".write": false },
"returnPickupRejections": {
  "$orderId": { "$uid": { ".write": "auth != null && auth.uid === $uid", ".read": "auth != null && auth.uid === $uid" } }
}

Known limitation:
- Pickup area is copied from return/order address fields when available, but this version does not yet enforce area-based partner filtering or nearby-area incentive routing. It currently broadcasts pending return pickups to approved delivery accounts that can read the queue.
- Admin-side Refund Initiated / Refund Completed controls and push-notification fan-out are not yet implemented.
- Run a test return order before production deployment.
