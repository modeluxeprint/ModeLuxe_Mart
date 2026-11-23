ModeLuxe Area-Based Delivery Update — TEST BUILD

Files:
- admin-panel.html: adds Area Out delivery controls, per-KM rate, 10/15 sec wait, All India switch, and per-category max road KM / enable switches.
- Delivery-Panel.html: collects Delivery Boy's Area and GPS base location at registration and My Account; filters local/nearby queue offers and shows extra incentive.
- Seller-Panel.html: unchanged; included so the three-panel set stays together.
- ModeLuxe-Order-Sync-Worker.js: adds local-first queue, delayed escalation action, OSRM road distance eligibility, and extra incentive credit at delivery settlement.

IMPORTANT LIMITATIONS BEFORE LIVE DEPLOYMENT
1. This is a test build, not a fully production-ready unattended scheduler. The 10/15-second escalation is triggered by an approved Delivery Panel that is open and connected. If every Delivery Panel is closed, no browser timer can fire the escalation. For guaranteed background escalation, deploy a Cloudflare Durable Object alarm (or another always-on scheduler) and bind it to this Worker.
2. Road distance uses the public OSRM demo router at router.project-osrm.org. It is not a guaranteed commercial SLA and may rate-limit or be unavailable. Do not rely on this public endpoint for high-volume production. For production, self-host OSRM / use a routing provider.
3. Customer order records must contain customer area plus GPS coordinates. Supported area fields: customerArea, area, deliveryArea, locality, or area/locality/city inside an address object. Supported coordinate fields: lat/lng or latitude/longitude. The current Worker already syncs lat/lng into sellerOrders, but the customer checkout must actually save these values.
4. Delivery Boy records must have deliveryArea, deliveryLat, deliveryLng. New registration captures these; existing Delivery Boys must open My Account, enter Area, capture GPS, and save.
5. Admin Panel writes /deliveryAreaSettings. Firebase Realtime Database rules must allow only authorized Admins to write this path and allow authorized Admins to read it. Do not make it publicly writable.
6. The Worker uses Firebase Service Account as before. No new API key or Google Maps key is required for the OSRM test route.
7. Category names in product data must match the Admin category labels (case-insensitive). If a category is absent/disabled, nearby escalation is blocked. For reliable matching, ensure product listing.category is populated.
8. Test with two delivery accounts in different Areas and one test order with valid customer GPS/Area before using real orders. Confirm base payout + extra incentive appears in deliveryWallets only once after QR delivery confirmation.

Suggested first test:
- Admin: set rate ₹5/KM, wait 10 seconds, set Grocery max 10 KM, All India OFF.
- Delivery Boy A: same Area as test customer.
- Delivery Boy B: nearby Area with GPS saved.
- Create test order with area + lat/lng; ship it.
- Verify only A gets local offer first; after timeout B gets nearby offer with route KM and incentive; claim from one account only; mark Delivered and inspect wallet credit metadata.

Keep your original Worker and HTML files as backups before deployment.
