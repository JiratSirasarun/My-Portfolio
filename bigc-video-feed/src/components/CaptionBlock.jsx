import { useState } from 'react';

// Roughly three lines at mobile width; longer captions get "...more".
const MAX_CHARS = 110;

// Render #hashtags in bold, like a real feed.
const withHashtags = (text) =>
  text.split(/(#[\p{L}\p{N}_]+)/u).map((part, i) =>
    part.startsWith('#') ? (
      <span key={i} className="hashtag">
        {part}
      </span>
    ) : (
      part
    )
  );

export default function CaptionBlock({ creatorName, caption }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = caption.length > MAX_CHARS;
  const text = expanded || !isLong ? caption : caption.slice(0, MAX_CHARS).trimEnd();

  return (
    <div className={`caption-block${expanded ? ' expanded' : ''}`}>
      <div className="caption-creator">{creatorName}</div>
      <p className="caption-text">
        {withHashtags(text)}
        {isLong && (
          <button type="button" className="caption-more" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'less' : '...more'}
          </button>
        )}
      </p>
    </div>
  );
}
