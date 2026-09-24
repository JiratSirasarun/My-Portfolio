import { useState } from 'react';
import BottomSheet from './BottomSheet.jsx';
import { HeartIcon, SendIcon } from './Icons.jsx';
import { formatCount } from '../format.js';

export default function CommentSheet({ item, onClose, onPost }) {
  const [draft, setDraft] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onPost(text); // mock: appended locally only
    setDraft('');
  };

  return (
    <BottomSheet
      open={!!item}
      title={item ? `${formatCount(item.commentCount)} comments` : ''}
      onClose={onClose}
      className="comment-sheet"
    >
      {item && (
        <>
          <ul className="comment-list">
            {item.comments.map((c, i) => (
              <li key={`${c.user}-${i}`} className={`comment${c.mine ? ' mine' : ''}`}>
                <span className="avatar" aria-hidden="true">
                  {c.user.replace(/[^a-z]/gi, '').charAt(0).toUpperCase()}
                </span>
                <div className="comment-body">
                  <span className="comment-user">{c.user}</span>
                  <p className="comment-text">{c.text}</p>
                  <span className="comment-time">{c.time} · Reply</span>
                </div>
                <span className="comment-like">
                  <HeartIcon width={16} height={16} />
                  {c.likes}
                </span>
              </li>
            ))}
          </ul>
          <form className="comment-input-row" onSubmit={submit}>
            <input
              className="comment-input"
              placeholder="Add a comment..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="Add a comment"
            />
            <button type="submit" className="send-btn" aria-label="Post comment" disabled={!draft.trim()}>
              <SendIcon />
            </button>
          </form>
        </>
      )}
    </BottomSheet>
  );
}
