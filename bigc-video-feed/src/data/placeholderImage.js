// Generates a shaded product "packshot" as an SVG data URI for products that
// don't have a real photo yet. Replace `productImage` in mockData.js with a
// real image (see the Vaseline entry) and this helper is no longer needed.
export function mockProductImage({ bg, body, cap, label, shape = 'bottle' }) {
  const shapes = {
    bottle: `
      <rect x="84" y="22" width="32" height="30" rx="5" fill="${cap}"/>
      <rect x="84" y="22" width="32" height="30" rx="5" fill="url(#shade)"/>
      <rect x="58" y="48" width="84" height="134" rx="26" fill="${body}"/>
      <rect x="58" y="48" width="84" height="134" rx="26" fill="url(#shade)"/>
      <rect x="68" y="92" width="64" height="50" rx="8" fill="#fff" opacity=".92"/>`,
    tube: `
      <rect x="84" y="150" width="32" height="34" rx="5" fill="${cap}"/>
      <rect x="84" y="150" width="32" height="34" rx="5" fill="url(#shade)"/>
      <path d="M52 22 H148 L134 154 H66 Z" fill="${body}"/>
      <path d="M52 22 H148 L134 154 H66 Z" fill="url(#shade)"/>
      <rect x="70" y="66" width="60" height="50" rx="8" fill="#fff" opacity=".92"/>`,
    pack: `
      <path d="M40 38 Q100 24 160 38 L156 176 Q100 186 44 176 Z" fill="${body}"/>
      <path d="M40 38 Q100 24 160 38 L156 176 Q100 186 44 176 Z" fill="url(#shade)"/>
      <path d="M40 38 Q100 24 160 38 L159 60 Q100 48 41 60 Z" fill="${cap}"/>
      <rect x="56" y="88" width="88" height="50" rx="8" fill="#fff" opacity=".92"/>`,
  };
  const labelY = { bottle: 122, tube: 96, pack: 118 }[shape];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="75%">
        <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${bg}"/>
      </radialGradient>
      <linearGradient id="shade" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".22"/>
        <stop offset=".28" stop-color="#fff" stop-opacity=".35"/>
        <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".25"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#bg)"/>
    <ellipse cx="100" cy="188" rx="58" ry="6" fill="#000" opacity=".12"/>
    ${shapes[shape]}
    <text x="100" y="${labelY}" text-anchor="middle" font-family="Arial, sans-serif"
      font-size="14" font-weight="800" fill="${body}">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
