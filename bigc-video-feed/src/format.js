// 1203 -> "1,203", 24500 -> "24.5K", 152300 -> "152.3K", 1200000 -> "1.2M"
export function formatCount(n) {
  if (n >= 1_000_000) return `${trim(n / 1_000_000)}M`;
  if (n >= 10_000) return `${trim(n / 1_000)}K`;
  return n.toLocaleString('en-US');
}

const trim = (x) => x.toFixed(1).replace(/\.0$/, '');

export const formatBaht = (n) => `฿${n.toLocaleString('en-US')}`;
