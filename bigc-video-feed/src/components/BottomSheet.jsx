import { useEffect, useState } from 'react';
import { CloseIcon } from './Icons.jsx';

// Shared slide-up sheet used by CommentSheet and ShareSheet. Keeps rendering
// the last `children` during the close animation.
export default function BottomSheet({ open, title, onClose, className = '', children }) {
  const [mounted, setMounted] = useState(open);
  const [lastChildren, setLastChildren] = useState(children);

  if (open && children !== lastChildren) setLastChildren(children);
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (open) return undefined;
    const t = setTimeout(() => setMounted(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className={`sheet-root${open ? ' open' : ''}`}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className={`sheet ${className}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-grabber" />
        <div className="sheet-header">
          <span className="sheet-title">{title}</span>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {open ? children : lastChildren}
      </div>
    </div>
  );
}
