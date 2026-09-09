/** Third-party/partner ad inventory — visually distinct from Big C PLUS's
 * own organic promo content since this will eventually be sold to brands. */
export function AdBanner() {
  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-dashed border-charcoal/25 bg-charcoal/[0.03] px-4 py-3">
      <span className="absolute right-3 top-2 text-[10px] font-semibold uppercase tracking-wide text-charcoal/35">
        Ad slot
      </span>
      <div className="h-12 w-12 shrink-0 rounded-lg bg-charcoal/10" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-charcoal/70">Partner placement available</p>
        <p className="truncate text-xs text-charcoal/45">Reserved for brand &amp; supplier campaigns</p>
      </div>
    </div>
  )
}
