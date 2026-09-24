import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import FeedItem from './FeedItem.jsx';
import { ChevronIcon, SearchIcon, VolumeIcon } from './Icons.jsx';

// Vertical, full-screen, scroll-snapping feed. Swipe/scroll, the up/down
// buttons, or the keyboard arrows all move one video at a time.
export default function VideoFeedScreen({
  items,
  activeIndex,
  onActiveIndexChange,
  scrollLocked,
  onLike,
  onSave,
  onOpenComments,
  onOpenShare,
  onOpenProduct,
  onToggleFollow,
  onToast,
}) {
  const scrollerRef = useRef(null);
  const [muted, setMuted] = useState(false);

  // Restore position when coming back from the product detail screen.
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    el.scrollTop = activeIndex * el.clientHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (index) => {
    const el = scrollerRef.current;
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    const index = Math.round(el.scrollTop / el.clientHeight);
    if (index !== activeIndex) onActiveIndexChange(index);
  };

  useEffect(() => {
    if (scrollLocked) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); goTo(activeIndex + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goTo(activeIndex - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="feed-screen">
      <header className="feed-header">
        <span className="brand-mark">
          Big C <b>PLUS</b>
        </span>
        <nav className="feed-tabs">
          <span className="feed-tab">Following</span>
          <span className="feed-tab active">For You</span>
        </nav>
        <button type="button" className="header-btn" aria-label="Search videos" onClick={() => onToast('Search is not part of this prototype')}>
          <SearchIcon />
        </button>
      </header>

      <button
        type="button"
        className="mute-btn"
        aria-label={muted ? 'Unmute' : 'Mute'}
        aria-pressed={muted}
        onClick={() => setMuted((m) => !m)}
      >
        <VolumeIcon muted={muted} />
      </button>

      <div
        ref={scrollerRef}
        className={`feed-scroller${scrollLocked ? ' locked' : ''}`}
        onScroll={handleScroll}
      >
        {items.map((item, i) => (
          <FeedItem
            key={item.id}
            item={item}
            isActive={i === activeIndex}
            onLike={() => onLike(item.id)}
            onSave={() => onSave(item.id)}
            onOpenComments={() => onOpenComments(item.id)}
            onOpenShare={() => onOpenShare(item.id)}
            onOpenProduct={() => onOpenProduct(item.productId)}
            onToggleFollow={() => onToggleFollow(item.creatorName)}
          />
        ))}
      </div>

      <div className="feed-nav" aria-label="Feed navigation">
        <button type="button" aria-label="Previous video" disabled={activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}>
          <ChevronIcon dir="up" />
        </button>
        <button type="button" aria-label="Next video" disabled={activeIndex === items.length - 1}
          onClick={() => goTo(activeIndex + 1)}>
          <ChevronIcon dir="down" />
        </button>
      </div>
    </div>
  );
}
