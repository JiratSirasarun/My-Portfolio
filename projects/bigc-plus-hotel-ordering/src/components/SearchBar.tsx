import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/** Global search entry point. Renders as a tappable field that always
 * routes to the shared /search results page — the query itself is typed
 * and edited there. */
export function SearchBar({ className = '' }: { className?: string }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/search')}
      className={`tap-target flex w-full items-center gap-2 rounded-full bg-white px-4 py-2.5 text-left text-sm text-charcoal/50 shadow-card ${className}`}
    >
      <Search size={18} strokeWidth={1.75} className="shrink-0 text-charcoal/40" />
      Search for products, e.g. water, snacks…
    </button>
  )
}
