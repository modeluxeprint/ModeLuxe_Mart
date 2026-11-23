ModeLuxe Return Pickup — Deployment Notes (Hindi)

Files:
1) Admin-Panel-UPDATED.html — replace existing Admin panel HTML. Login/OTP/Passkey code was not edited.
2) Delivery-Panel-UPDATED.html — replace existing Delivery panel HTML. Normal delivery claim/status flow retained.
3) ModeLuxe-Order-Sync-Worker-UPDATED.js — Worker source required by Return Pickup actions. It is included unchanged from the provided worker source because it already contains claimReturnPickup and updateReturnPickupStatus actions. If your deployed Worker already has these exact actions, no Worker deployment is needed.

Flow implemented in these files:
- Admin approves a pending return -> creates separate returnPickupQueue and returnPickupAssignments nodes. Normal deliveryQueue is not overwritten.
- Delivery partner sees a separate Return Pickup popup, can Cancel (per-user rejection) or Accept Pickup. Worker uses a claim record so only the first partner wins.
- Assigned partner can mark Product Picked Up and Product Received.
- Admin can mark Refund Initiated and then Refund Completed after Product Received. Status mirrors to returnRequests, orders/{orderId}/returnRequest and sellerReturnRequests/{sellerUid}/{orderId}.

Important setup:
- Worker URL used by Delivery Panel remains the existing MLM_PUSH_REGISTER_URL. Deploy the included Worker only if your currently deployed Worker does not contain both actions above. Keep existing Worker secrets and ADMIN_UIDS unchanged.
- Firebase Rules must allow the logged-in Admin to update returnRequests/orders/sellerReturnRequests/returnPickupQueue/returnPickupAssignments, and the assigned delivery partner to read the return queue/own assignment and write their own rejection. Worker writes use service credentials. Do not replace all existing rules blindly; merge narrowly with your current rules.
- Area-based filtering and automatic nearby-area incentive fan-out are not enabled by these two panel files: the currently provided delivery profile/queue schema does not reliably supply partner area/coordinates.

GitHub Pages deployment note:
The supplied Actions log says build passed and deploy was cancelled while GitHub reported the deployment was already finished (HTTP 400). That log does not indicate an HTML syntax failure. After committing the two HTML files, let the current Pages workflow finish; avoid starting/cancelling multiple deployments at once.
