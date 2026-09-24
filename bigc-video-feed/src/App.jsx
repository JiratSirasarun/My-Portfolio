import { useCallback, useEffect, useRef, useState } from 'react';
import { FEED_ITEMS, getProduct } from './data/mockData.js';
import VideoFeedScreen from './components/VideoFeedScreen.jsx';
import ProductDetailScreen from './components/ProductDetailScreen.jsx';
import CommentSheet from './components/CommentSheet.jsx';
import ShareSheet from './components/ShareSheet.jsx';
import StatusBar from './components/StatusBar.jsx';
import BottomNav from './components/BottomNav.jsx';

// Top-level: owns the active feed index, per-item engagement state, which
// sheet is open, and which screen (feed vs. product detail) is shown.
export default function App() {
  const [screen, setScreen] = useState({ name: 'feed' }); // or { name: 'pdp', productId }
  const [activeIndex, setActiveIndex] = useState(0);

  // Per-item toggle state, keyed by feed item id.
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [shared, setShared] = useState({});
  const [userComments, setUserComments] = useState({}); // { [itemId]: comment[] }
  const [following, setFollowing] = useState({}); // { [creatorName]: bool }

  // Sheets: only one open at a time, tied to the item it was opened from.
  const [commentSheetItemId, setCommentSheetItemId] = useState(null);
  const [shareSheetItemId, setShareSheetItemId] = useState(null);

  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const toggle = (setter) => (id) => setter((s) => ({ ...s, [id]: !s[id] }));

  // Merge static mock counts with the viewer's local interactions.
  const items = FEED_ITEMS.map((item) => {
    const extra = userComments[item.id] ?? [];
    return {
      ...item,
      product: getProduct(item.productId),
      isLiked: !!liked[item.id],
      isSaved: !!saved[item.id],
      isShared: !!shared[item.id],
      hasCommented: extra.length > 0,
      isFollowing: !!following[item.creatorName],
      likeCount: item.likeCount + (liked[item.id] ? 1 : 0),
      saveCount: item.saveCount + (saved[item.id] ? 1 : 0),
      shareCount: item.shareCount + (shared[item.id] ? 1 : 0),
      commentCount: item.commentCount + extra.length,
      comments: [...extra, ...item.comments],
    };
  });

  const commentItem = items.find((i) => i.id === commentSheetItemId);
  const shareItem = items.find((i) => i.id === shareSheetItemId);

  const handlePostComment = (itemId, text) => {
    setUserComments((s) => ({
      ...s,
      [itemId]: [{ user: 'you', text, time: 'now', likes: 0, mine: true }, ...(s[itemId] ?? [])],
    }));
  };

  const handleShare = (itemId, platform) => {
    setShared((s) => ({ ...s, [itemId]: true }));
    setShareSheetItemId(null);
    showToast(platform === 'Copy link' ? 'Link copied (mock)' : `Shared to ${platform} (mock)`);
  };

  const handleToggleFollow = (creatorName) => {
    const next = !following[creatorName];
    setFollowing((s) => ({ ...s, [creatorName]: next }));
    showToast(next ? `Following ${creatorName}` : `Unfollowed ${creatorName}`);
  };

  const isPdp = screen.name === 'pdp';

  return (
    <div className="phone">
      <StatusBar tone={isPdp ? 'brand' : 'dark'} />
      <div className="phone-body">
        {isPdp ? (
          <ProductDetailScreen
            product={getProduct(screen.productId)}
            cartCount={cartCount}
            onBack={() => setScreen({ name: 'feed' })}
            onAddToCart={(qty) => {
              setCartCount((c) => c + qty);
              showToast(`Added ${qty} to cart`);
            }}
            onToast={showToast}
          />
        ) : (
          <>
            <VideoFeedScreen
              items={items}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              scrollLocked={!!(commentItem || shareItem)}
              onLike={toggle(setLiked)}
              onSave={toggle(setSaved)}
              onOpenComments={setCommentSheetItemId}
              onOpenShare={setShareSheetItemId}
              onOpenProduct={(productId) => setScreen({ name: 'pdp', productId })}
              onToggleFollow={handleToggleFollow}
              onToast={showToast}
            />
            <BottomNav cartCount={cartCount} onUnavailable={(tab) => showToast(`${tab} is not part of this prototype`)} />
            <CommentSheet
              item={commentItem}
              onClose={() => setCommentSheetItemId(null)}
              onPost={(text) => handlePostComment(commentItem.id, text)}
            />
            <ShareSheet
              item={shareItem}
              onClose={() => setShareSheetItemId(null)}
              onShare={(platform) => handleShare(shareItem.id, platform)}
            />
          </>
        )}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}
