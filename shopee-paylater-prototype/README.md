# Big C PLUS — SPayLater Checkout Prototype

A single-file, click-through React prototype adding **Shopee PayLater (SPayLater)**
as a payment method in the Big C PLUS "Order Summary" checkout flow, including
0% installment tiers and a payment-failure/retry path.

## Run it

No build step, install, or network access required — `index.html` is fully
self-contained. React and ReactDOM are vendored inline and the app code is
pre-compiled from JSX to plain JS, so it works offline and behind restrictive
proxies/firewalls.

Just double-click `index.html` to open it directly in a browser, or serve it:

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Flow

`Home → Payment method → Order summary → Shopee (payer details) → Success / Failure`

- **Payment method**: existing three methods are unchanged. `SPayLater` is a new
  option with a "New" badge; tapping it expands inline (accordion, no navigation)
  into a 2×2 grid of installment tiers (3/6/10/12 months, single-select).
- **Order summary**: shows `SPayLater · X months · 0%` (or the chosen method)
  plus subtotal/delivery/total. Primary CTA is "Continue to Shopee" for
  SPayLater, "Place order" otherwise.
- **Shopee redirect**: visually distinct (Shopee orange, `#EE4D2D`) — only used
  on this screen, never elsewhere in the flow. Collects payer name + email.
  "Confirm" branches to Success or Failure.
- **Failure**: red error state, "Pending payment" status + order ID. "Pay
  again" loops back to the **Shopee payer-details screen only** (step 3), never
  restarting delivery method/address/date steps. "Back home" exits the flow.

## Dev tools

A dark "DEV PREVIEW" bar at the top of the phone frame has a **Force payment
failure** checkbox so reviewers can reach both the success and failure
branches without a real payment gateway. It's clearly out-of-band chrome, not
part of the simulated app UI.

## Editing installment thresholds

All installment-tier data lives in one config array at the top of
`index.html`:

```js
const installmentPlans = [
  { months: 3, minPurchase: null, isDefault: true },
  { months: 6, minPurchase: null, isDefault: false },
  { months: 10, minPurchase: null, isDefault: false },
  { months: 12, minPurchase: null, isDefault: false },
];
```

`minPurchase: null` renders as the placeholder "min. purchase ฿XXX". Once the
business team confirms real baht thresholds, replace `null` with the number
(e.g. `minPurchase: 500`) and the UI renders it automatically — no layout
changes needed.

This config block sits near the top of the compiled `<script>` in
`index.html`, before any component code, so it can be edited directly without
touching JSX/build tooling.

## Branding scope

Big C PLUS green (`#8BC53F`) is used on every native screen (payment method,
order summary, success, failure). Shopee orange (`#EE4D2D`) is reserved
strictly for the Shopee-branded redirect screen (header + banner + Confirm
button) to signal the external handoff. The failure screen uses a semantic
error red, not Shopee's orange, since it is still a Big C PLUS-native screen.
