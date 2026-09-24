import BottomSheet from './BottomSheet.jsx';

// Mock share targets: neutral monogram tiles, no real sharing.
const PLATFORMS = [
  { name: 'LINE', short: 'L', color: '#06A94D' },
  { name: 'Facebook', short: 'f', color: '#3B5BA5' },
  { name: 'Messenger', short: 'M', color: '#7B61FF' },
  { name: 'X', short: 'X', color: '#222' },
  { name: 'Copy link', short: '🔗', color: '#8BC53F' },
];

export default function ShareSheet({ item, onClose, onShare }) {
  return (
    <BottomSheet open={!!item} title="Share to" onClose={onClose} className="share-sheet">
      <div className="share-row">
        {PLATFORMS.map((p) => (
          <button key={p.name} type="button" className="share-target" onClick={() => onShare(p.name)}>
            <span className="share-tile" style={{ background: p.color }}>
              {p.short}
            </span>
            <span className="share-name">{p.name}</span>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
