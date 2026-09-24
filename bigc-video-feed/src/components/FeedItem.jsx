import { useEffect, useState } from 'react';
import ActionRail from './ActionRail.jsx';
import CaptionBlock from './CaptionBlock.jsx';
import ProductCouponCard from './ProductCouponCard.jsx';
import { PlayIcon } from './Icons.jsx';

// One full-screen "video". Playback is simulated: the full-bleed product shot
// slowly zooms/pans, and a progress bar runs for
// `durationSec` and loops. Tap the frame to pause/resume. Replace
// `.video-frame` with a <video> element when real clips exist.
export default function FeedItem({
  item,
  isActive,
  onLike,
  onSave,
  onOpenComments,
  onOpenShare,
  onOpenProduct,
  onToggleFollow,
}) {
  const [paused, setPaused] = useState(false);

  // Leaving a video resets it, so it plays from the start when you come back.
  useEffect(() => {
    if (!isActive) setPaused(false);
  }, [isActive]);

  const playing = isActive && !paused;
  // Real photos fill the frame; generated SVG placeholders sit inset as a card.
  const isPlaceholder = item.product.productImage.startsWith('data:image/svg');

  return (
    <section
      className={`feed-item${playing ? ' playing' : ''}`}
      aria-label={`Video by ${item.creatorName}`}
    >
      <div
        className="video-frame"
        style={{ background: item.videoBackground }}
        onClick={() => setPaused((p) => !p)}
        role="button"
        aria-label={paused ? 'Play video' : 'Pause video'}
      >
        <img className={`video-subject${isPlaceholder ? ' inset' : ''}`} src={item.product.productImage} alt="" />
        {paused && (
          <span className="video-paused" aria-hidden="true">
            <PlayIcon />
          </span>
        )}
      </div>

      {/* Scrims keep white overlay text legible on any frame. */}
      <div className="scrim scrim-top" />
      <div className="scrim scrim-bottom" />

      <div className="overlay-bottom-left">
        <ProductCouponCard product={item.product} onOpen={onOpenProduct} />
        <CaptionBlock creatorName={item.creatorName} caption={item.caption} />
      </div>

      <ActionRail
        item={item}
        onLike={onLike}
        onSave={onSave}
        onOpenComments={onOpenComments}
        onOpenShare={onOpenShare}
        onToggleFollow={onToggleFollow}
      />

      <div className="video-progress" aria-hidden="true">
        {/* Remounting on activation restarts the bar from zero. */}
        <span key={isActive ? 'on' : 'off'} style={{ animationDuration: `${item.durationSec}s` }} />
      </div>
    </section>
  );
}
