// No real product/lifestyle photography has been supplied yet. These are
// deterministic, offline-safe placeholders — soft warm gradients with a
// gentle light bloom, standing in for the "warm, editorial lifestyle
// photography" mood until real imagery is dropped in.

const palette: Array<[string, string]> = [
  ['#f3e9dc', '#d9c7a8'], // cream
  ['#e7e0c9', '#bfae7c'], // sand
  ['#dce5d3', '#9fb68c'], // sage
  ['#f0ded2', '#c9997a'], // terracotta
  ['#e3e9e1', '#8fa98a'], // moss
  ['#efe6da', '#b79c7c'], // taupe
]

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function placeholderImage(seed: string): string {
  const hash = hashString(seed)
  const [from, to] = palette[hash % palette.length]
  const cx = 25 + (hash % 50)
  const cy = 20 + ((hash >> 5) % 45)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
      <radialGradient id="b" cx="${cx}%" cy="${cy}%" r="65%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#g)"/>
    <rect width="100" height="100" fill="url(#b)"/>
  </svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
