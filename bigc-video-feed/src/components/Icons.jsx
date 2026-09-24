// Minimal inline SVG icon set (no icon library dependency).
const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const HeartIcon = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
    <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.1 4.5c2 0 3.5 1.1 4.9 2.9 1.4-1.8 2.9-2.9 4.9-2.9 3.5 0 5.6 3.5 4.4 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" />
  </svg>
);

export const CommentIcon = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
    <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20.5l1.5-5A8.5 8.5 0 1 1 21 11.5z" />
  </svg>
);

export const BookmarkIcon = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
    <path d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4.5-7 4.5v-16a1 1 0 0 1 1-1z" />
  </svg>
);

export const ShareIcon = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
    <path d="M13.5 4.5 21 11.5l-7.5 7v-4c-5 0-8.5 1.5-10.5 5 .8-5.2 3.5-9.8 10.5-10.8z" />
  </svg>
);

export const ChevronIcon = ({ dir = 'down', ...p }) => (
  <svg {...base} width={22} height={22} {...p} fill="none" stroke="currentColor"
    style={{ transform: { up: 'rotate(180deg)', left: 'rotate(90deg)', right: 'rotate(-90deg)', down: 'none' }[dir] }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...base} width={22} height={22} {...p} fill="none" stroke="currentColor">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SendIcon = (p) => (
  <svg {...base} width={22} height={22} {...p} fill="none" stroke="currentColor">
    <path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" />
  </svg>
);

export const CartIcon = (p) => (
  <svg {...base} width={24} height={24} {...p} fill="none" stroke="currentColor">
    <circle cx="9" cy="20" r="1.3" />
    <circle cx="18" cy="20" r="1.3" />
    <path d="M2.5 3.5h2.8l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1l1.7-7.3H6.2" />
  </svg>
);

export const TicketIcon = (p) => (
  <svg {...base} width={14} height={14} {...p} fill="none" stroke="currentColor" strokeWidth={2.4}>
    <path d="M3 8V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4z" transform="translate(0 2)" />
  </svg>
);

export const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" width={44} height={44} {...p} fill="currentColor">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

const tab = { ...base, width: 24, height: 24, fill: 'none', stroke: 'currentColor' };

export const HomeIcon = (p) => (
  <svg {...tab} {...p}>
    <path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1z" />
  </svg>
);

export const GridIcon = (p) => (
  <svg {...tab} {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

export const VideoTabIcon = ({ filled, ...p }) => (
  <svg {...tab} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="4" fill={filled ? 'currentColor' : 'none'} />
    <path d="M10 9v6l5-3z" fill={filled ? '#000' : 'currentColor'} stroke="none" />
  </svg>
);

export const UserIcon = (p) => (
  <svg {...tab} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20.5c1.2-4 4.3-6 8-6s6.8 2 8 6" />
  </svg>
);

export const SearchIcon = (p) => (
  <svg {...tab} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.3-4.3" />
  </svg>
);

export const VolumeIcon = ({ muted, ...p }) => (
  <svg {...tab} width={20} height={20} {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
    {muted ? <path d="m16 9.5 5 5m0-5-5 5" /> : <path d="M16 9a4.5 4.5 0 0 1 0 6m2.5-8.5a8 8 0 0 1 0 11" />}
  </svg>
);

export const PlusIcon = (p) => (
  <svg {...tab} width={12} height={12} strokeWidth={3.5} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...tab} width={12} height={12} strokeWidth={3.5} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
