import ActionRail from './ActionRail.jsx';
import CaptionBlock from './CaptionBlock.jsx';
import ProductCouponCard from './ProductCouponCard.jsx';
import { PlayIcon } from './Icons.jsx';

// One full-screen "video". The video is mocked with an animated gradient
// frame plus the product packshot; swap `.video-frame` for a <video> later.
export default function FeedItem({ item, isActive, onLike, onSave, onOpenComments, onOpenShare, onOpenProduct }) {
  return (
    <section className={`feed-item${isActive ? ' active' : ''}`} aria-label={`Video by ${item.creatorName}`}>
      <div className="video-frame" style={{ background: item.videoBackground }}>
        <img className="video-subject" src={item.product.productImage} alt="" />
        <span className="video-mock-label">
          <PlayIcon width={14} height={14} /> Mock video
        </span>
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
      />
    </section>
  );
}
