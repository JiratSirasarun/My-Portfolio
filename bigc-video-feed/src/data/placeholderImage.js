// Generates a simple product "packshot" as an SVG data URI so the prototype
// needs no external image assets. Replace `productImage` in mockData.js with
// real image URLs and this helper is no longer needed.
export function mockProductImage({ bg, body, cap, label, shape = 'bottle' }) {
  const shapes = {
    bottle: `
      <rect x="82" y="30" width="36" height="26" rx="6" fill="${cap}"/>
      <rect x="62" y="52" width="76" height="126" rx="22" fill="${body}"/>
      <rect x="70" y="96" width="60" height="44" rx="6" fill="#fff" opacity=".9"/>`,
    tube: `
      <rect x="86" y="150" width="28" height="30" rx="4" fill="${cap}"/>
      <path d="M58 30 H142 L130 152 H70 Z" fill="${body}"/>
      <rect x="72" y="72" width="56" height="44" rx="6" fill="#fff" opacity=".9"/>`,
    pack: `
      <rect x="44" y="40" width="112" height="130" rx="12" fill="${body}"/>
      <rect x="44" y="40" width="112" height="22" rx="10" fill="${cap}"/>
      <rect x="58" y="92" width="84" height="44" rx="6" fill="#fff" opacity=".9"/>`,
  };
  const labelY = { bottle: 123, tube: 99, pack: 119 }[shape];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${bg}"/>
    ${shapes[shape]}
    <text x="100" y="${labelY}" text-anchor="middle" font-family="Arial, sans-serif"
      font-size="13" font-weight="700" fill="${body}">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
