// Fake phone status bar, shown only inside the desktop phone frame (a real
// phone draws its own).
export default function StatusBar({ tone = 'dark' }) {
  return (
    <div className={`status-bar ${tone}`} aria-hidden="true">
      <span className="status-time">9:41</span>
      <span className="status-icons">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="6" rx="1" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="15" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 3.8a7 7 0 0 0-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4zm0 3.3c.5 0 1 .2 1.3.5L8 10.8 6.7 9.4c.3-.3.8-.5 1.3-.5z" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x=".5" y=".5" width="22" height="11" rx="3" stroke="currentColor" opacity=".45" />
          <rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" />
          <rect x="23.5" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".45" />
        </svg>
      </span>
    </div>
  );
}
