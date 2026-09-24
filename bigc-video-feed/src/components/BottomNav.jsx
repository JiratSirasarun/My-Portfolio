import { CartIcon, GridIcon, HomeIcon, UserIcon, VideoTabIcon } from './Icons.jsx';

// App tab bar. Only the Video tab exists in this prototype; the others show a
// toast instead of navigating.
const TABS = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'categories', label: 'Categories', Icon: GridIcon },
  { id: 'video', label: 'Video', Icon: VideoTabIcon },
  { id: 'cart', label: 'Cart', Icon: CartIcon },
  { id: 'account', label: 'Me', Icon: UserIcon },
];

export default function BottomNav({ cartCount, onUnavailable }) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {TABS.map(({ id, label, Icon }) => {
        const active = id === 'video';
        return (
          <button
            key={id}
            type="button"
            className={`bottom-tab${active ? ' active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => !active && onUnavailable(label)}
          >
            <span className="bottom-tab-icon">
              {id === 'video' ? <Icon filled /> : <Icon />}
              {id === 'cart' && cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
