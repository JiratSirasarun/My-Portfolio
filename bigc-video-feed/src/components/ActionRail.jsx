import { useState } from 'react';
import { formatCount } from '../format.js';
import { BookmarkIcon, CommentIcon, HeartIcon, ShareIcon } from './Icons.jsx';

function RailButton({ label, count, active, onClick, children }) {
  // `pop` replays a short bounce every time the button is tapped.
  const [pop, setPop] = useState(0);
  return (
    <button
      type="button"
      className={`rail-btn${active ? ' active' : ''}`}
      aria-label={label}
      aria-pressed={active}
      onClick={() => {
        setPop((n) => n + 1);
        onClick();
      }}
    >
      <span key={pop} className={`rail-icon${pop ? ' pop' : ''}`}>
        {children}
      </span>
      <span className="rail-count">{formatCount(count)}</span>
    </button>
  );
}

// Every button shows icon + count. Active states:
//   Like / Save  -> toggled, filled brand green
//   Comment      -> filled green once you've commented on this video
//   Share        -> filled green once you've shared this video
export default function ActionRail({ item, onLike, onSave, onOpenComments, onOpenShare }) {
  return (
    <div className="action-rail">
      <RailButton label={item.isLiked ? 'Unlike' : 'Like'} count={item.likeCount} active={item.isLiked} onClick={onLike}>
        <HeartIcon filled={item.isLiked} />
      </RailButton>
      <RailButton label="Comments" count={item.commentCount} active={item.hasCommented} onClick={onOpenComments}>
        <CommentIcon filled={item.hasCommented} />
      </RailButton>
      <RailButton label={item.isSaved ? 'Unsave' : 'Save'} count={item.saveCount} active={item.isSaved} onClick={onSave}>
        <BookmarkIcon filled={item.isSaved} />
      </RailButton>
      <RailButton label="Share" count={item.shareCount} active={item.isShared} onClick={onOpenShare}>
        <ShareIcon filled={item.isShared} />
      </RailButton>
    </div>
  );
}
