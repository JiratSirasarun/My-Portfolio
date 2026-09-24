# Big C PLUS: Short-Video Shopping Feed (prototype)

A clickable React prototype of a full-screen, swipeable, shoppable video feed for the Big C PLUS app.

## Run

```bash
cd bigc-video-feed
npm install
npm run dev        # open the printed URL; use a mobile-width viewport or DevTools device mode
```

On a desktop browser the app renders inside a 390px phone frame. On a phone it fills the screen.

## What to try

| Area | Interaction |
| --- | --- |
| Feed | Swipe or scroll vertically (snaps one video at a time), use the ⌃/⌄ buttons, or press ↑/↓. There are 4 mock videos. |
| Like / Save | Toggle filled green ↔ outline; the count goes up or down by one |
| Comment | Opens a bottom sheet with mock comments and an input. Posting adds your comment locally, and the icon turns active. |
| Share | Opens a share sheet with mock platforms. Picking one shows a toast, adds one to the count, and turns the icon active. |
| Caption | Tap **...more** to expand a long caption in place, and **less** to collapse it |
| Product + coupon card | Opens the Product Detail screen (price, same coupon with Collect, quantity, Add to Cart → cart badge). Back returns to the same video. |

## Structure

```
src/
  data/mockData.js          # PRODUCTS + FEED_ITEMS: swap in real data here
  data/placeholderImage.js  # SVG packshot placeholders (drop when real images exist)
  App.jsx                   # top level: active index, like/save/share/comment state, sheets, feed ↔ PDP
  components/
    VideoFeedScreen.jsx     # scroll-snap container, header, prev/next controls
    FeedItem.jsx            # one video: mock frame, scrims, overlays
    ActionRail.jsx          # like / comment / save / share
    CaptionBlock.jsx        # creator name + truncating caption
    ProductCouponCard.jsx   # thumbnail, name, coupon badge → PDP
    CommentSheet.jsx, ShareSheet.jsx, BottomSheet.jsx
    ProductDetailScreen.jsx
```

The video is mocked with an animated gradient and the product image. To use real video, replace `.video-frame` in `FeedItem.jsx` with a `<video>`.
