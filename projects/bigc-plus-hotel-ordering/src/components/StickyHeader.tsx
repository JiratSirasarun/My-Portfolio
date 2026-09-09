import { ChevronLeft, Search, ShoppingCart } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../state/cartStore'
import { getItemCount } from '../state/cartStore'

type StickyHeaderProps = {
  onBack?: () => void
  center?: ReactNode
  showSearchIcon?: boolean
  showCart?: boolean
}

/** Shared sticky header for sub-pages (category, product, search, cart).
 * The home page uses its own hero header instead. */
export function StickyHeader({ onBack, center, showSearchIcon = true, showCart = true }: StickyHeaderProps) {
  const navigate = useNavigate()
  const lines = useCartStore((s) => s.lines)
  const count = getItemCount(lines)

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-charcoal/5 bg-ivory/95 px-3 py-2.5 backdrop-blur">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="tap-target flex shrink-0 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </button>
      ) : (
        <div className="w-1" />
      )}

      <div className="min-w-0 flex-1">{center}</div>

      {showSearchIcon && (
        <button
          type="button"
          onClick={() => navigate('/search')}
          aria-label="Search"
          className="tap-target flex shrink-0 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
        >
          <Search size={20} strokeWidth={1.75} />
        </button>
      )}

      {showCart && (
        <button
          type="button"
          onClick={() => navigate('/cart')}
          aria-label={`Cart, ${count} items`}
          className="tap-target relative flex shrink-0 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
        >
          <ShoppingCart size={20} strokeWidth={1.75} />
          {count > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-green px-1 text-[10px] font-semibold text-green-deep">
              {count}
            </span>
          )}
        </button>
      )}
    </header>
  )
}
