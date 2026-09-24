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
| Video | Tap the video to pause or resume (the progress bar at the bottom stops too). The speaker button mutes and unmutes. |
| Creator | Tap the **+** under the avatar to follow and **✓** to unfollow |
| Tab bar | Video is the active tab, and Cart shows the cart count. The other tabs only show a toast. |
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
    VideoFeedScreen.jsx     # scroll-snap container, header, mute, prev/next controls
    StatusBar.jsx, BottomNav.jsx  # phone chrome
    FeedItem.jsx            # one video: mock frame, scrims, overlays
    ActionRail.jsx          # like / comment / save / share
    CaptionBlock.jsx        # creator name + truncating caption
    ProductCouponCard.jsx   # thumbnail, name, coupon badge → PDP
    CommentSheet.jsx, ShareSheet.jsx, BottomSheet.jsx
    ProductDetailScreen.jsx
```

Playback is simulated: the product photo fills the frame and slowly zooms while the progress bar runs. Products without a real photo use a drawn SVG placeholder shown as a card. To use real clips, replace `.video-frame` in `FeedItem.jsx` with a `<video>`.

**Product photos:** the Vaseline Peach 1+1 packshot is in `src/assets/` and imported in `mockData.js`. To add a photo for another product, put it in `src/assets/`, import it the same way, and set it as that product's `productImage`. Prices are still mock values.
