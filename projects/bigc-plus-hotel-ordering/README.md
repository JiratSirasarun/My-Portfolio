# Big C PLUS × Asset World — Hotel Room Ordering (M-Web)

A mobile-web ordering experience for hotel guests: scan a QR code in the
room, pick a language, and — for English-speaking guests — order Thai
souvenirs and hotel essentials from the phone browser with no account
creation. Thai-language guests see a styled redirect to the native Big C
PLUS app instead.

Guest-checkout only. There is no login, sign-up, or saved-account flow
anywhere in this build, by design.

## Stack

React + TypeScript + Tailwind CSS v4, React Router, Zustand for client
state (cart, guest session). No backend — order submission is a mocked
async call with a loading state.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks and produces dist/
```

## Screens

All 9 screens from the brief are live routes:

| Route | Screen |
| --- | --- |
| `/` | Landing — language select |
| `/app-redirect` | App Store / Play Store redirect (Thai branch) |
| `/home` | Hotel service home page |
| `/category/:slug` | Category page |
| `/search` | Search results (global, curated SKUs only) |
| `/product/:id` | Product page |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/thank-you` | Order confirmed |

Cart, guest session (room/hotel/name), and language are held in memory via
Zustand — they persist across navigation within a session but reset on a
hard reload, per the brief ("in-memory is fine; no need for localStorage/
backend persistence"). `/home` and downstream routes redirect to `/` if no
language has been picked yet, mirroring the real QR → language-select →
shop flow.

Product imagery is a set of generated warm-toned gradient placeholders
(`src/lib/placeholderImage.ts`) — deterministic per product, offline-safe.
Swap in real lifestyle photography per SKU when it's available.

## Open questions (flagged, not resolved)

These came up directly from the customer-journey doc and were **not**
silently decided — they need a call before this goes further:

1. **Product range** — is the assortment packaged/ambient only, or does it
   include fresh food? This affects delivery-time expectations and whether
   Express/instant delivery options are needed. Built assuming packaged/
   ambient only (no perishable-handling UI).
2. **Phone number at checkout** — strictly required, or optional-but
   -requested? Built as a required field for now (`src/pages/CheckoutPage.tsx`).
3. **English product detail copy** — is it translated per-SKU, or is there a
   fallback for untranslated items? Built assuming every SKU has English
   copy; no fallback/untranslated state exists yet.

## Notable implementation choices

- **Search scope**: `Product.searchable` enforces the "specific, curated
  SKU range" constraint from the journey doc in code (`searchProducts` in
  `src/data/products.ts`), not just in copy — about half the catalog is
  excluded from search results by design.
- **Ad vs. promo banners**: the category page's partner ad slot
  (`AdBanner.tsx`) is deliberately styled distinctly (dashed border, "Ad
  slot" label) from Big C PLUS's own promo banner (`PromoBanner.tsx`),
  since the former is inventory intended to be sold to suppliers later.
- **Product page → back, not cart**: adding to cart from the product page
  returns the guest to wherever they came from (category/search/home)
  rather than forcing a navigation to the cart, per spec.
- **Wide viewports**: this is a mobile-web-only product, but the whole app
  is centered to a phone-width column via a `transform` on the root
  element (see comment in `App.tsx`) so `position: fixed` bars don't
  stretch edge-to-edge on a desktop browser.
