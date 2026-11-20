ModeLuxe Seller + Delivery Assignment Fix V2

Files:
1. Seller-Panel-FIXED.html
2. ModeLuxe-Order-Sync-Worker-FIXED-V2.js

What changed:
- Removed the Seller Panel browser-side write to deliveryAssignments/{orderId}.
- Seller Panel now relies on the authenticated updateStatus Worker response.
- Worker creates or repairs deliveryAssignments/{orderId} and creates deliveryQueue/{orderId} when missing.
- Existing assignment fields such as deliveryUid, accepted status, and acceptedAt are preserved while missing canonical order fields are repaired.

Deploy:
1. Replace Seller-Panel.html in your GitHub/site with Seller-Panel-FIXED.html.
2. Deploy ModeLuxe-Order-Sync-Worker-FIXED-V2.js to the existing Cloudflare Worker.
3. No Firebase Rules change is included or required for this specific fix; keep the previously deployed restricted rules.

Test:
1. Login as seller.
2. Open an order and mark it Processing.
3. Then mark it Shipped.
4. Confirm no Permission Denied popup appears.
5. Confirm one delivery assignment and one pending delivery queue record exist.
6. Confirm the Delivery Panel shows the new order.

Checks:
- Worker JavaScript passed node --check.
- Seller Panel inline JavaScript syntax checks passed.
- Live Firebase/Cloudflare deployment was not tested here.
