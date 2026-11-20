ModeLuxe Mart — Delivered Order Sync Fix

What this fixes:
1. When Delivery Panel confirms an order as Delivered, the Worker updates both orders/{orderId} and sellerOrders/{sellerUid}/{orderId}.
2. Seller Panel reads the canonical order status first, so a Delivered status overrides an older Shipped value.
3. Seller Panel shows “✓ Delivered” and moves the order from Received Order to Delivered Order.
4. On seller login, a secure Worker action backfills previously delivered orders (including orders whose delivery wallet was already settled).

Deploy in this order:
1. Deploy ModeLuxe-Order-Sync-Worker-FIXED-V2.js to the existing Cloudflare Worker.
2. Replace the website Seller-Panel.html with Seller-Panel-FIXED.html and commit/publish it.
3. Refresh the Seller Panel and log in again. The one-time sync runs automatically.
4. Check Delivered Order count. Existing delivered orders should move there; new deliveries will sync automatically.

No Firebase Rules change is required for this specific fix. Keep the existing restricted rules.

Validation:
- Worker passed node --check.
- Seller Panel inline JavaScript passed syntax checks.
- Live Firebase/Cloudflare deployment was not tested in this environment.
