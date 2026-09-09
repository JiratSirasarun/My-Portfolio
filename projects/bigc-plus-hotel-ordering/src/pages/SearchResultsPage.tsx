import { Check, Plus, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StickyHeader } from '../components/StickyHeader'
import { searchProducts } from '../data/products'
import { useCartStore } from '../state/cartStore'

export function SearchResultsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchProducts(query), [query])
  const addItem = useCartStore((s) => s.addItem)
  const [addedId, setAddedId] = useState<string | null>(null)

  function handleQuickAdd(productId: string) {
    addItem(productId, 1)
    setAddedId(productId)
    setTimeout(() => setAddedId((current) => (current === productId ? null : current)), 1200)
  }

  return (
    <div className="min-h-dvh">
      <StickyHeader
        onBack={() => navigate(-1)}
        showSearchIcon={false}
        center={
          <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-card">
            <Search size={16} strokeWidth={1.75} className="shrink-0 text-charcoal/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, e.g. water, snacks…"
              className="w-full min-w-0 bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/40"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="shrink-0 text-charcoal/40">
                <X size={16} strokeWidth={2} />
              </button>
            )}
          </div>
        }
      />

      <div className="px-5 pt-2">
        {query.trim() === '' && (
          <p className="pt-10 text-center text-sm text-charcoal/50">
            Search across our curated in-room essentials and Thai favorites.
          </p>
        )}

        {query.trim() !== '' && results.length === 0 && (
          <p className="pt-10 text-center text-sm text-charcoal/50">No results for &ldquo;{query}&rdquo;.</p>
        )}

        <div className="divide-y divide-charcoal/5">
          {results.map((product) => {
            const justAdded = addedId === product.id
            return (
              <div key={product.id} className="flex items-center gap-3 py-3">
                <button
                  type="button"
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-charcoal/5">
                    <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-display text-[15px] text-charcoal">{product.name}</p>
                    <p className="text-sm text-green-deep">฿{product.price.toLocaleString()}</p>
                  </div>
                </button>
                <button
                  type="button"
                  aria-label={`Add ${product.name} to cart`}
                  onClick={() => handleQuickAdd(product.id)}
                  className={`tap-target flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                    justAdded ? 'bg-green-deep text-ivory' : 'bg-green text-green-deep'
                  }`}
                >
                  {justAdded ? <Check size={18} strokeWidth={2.25} /> : <Plus size={18} strokeWidth={2.25} />}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
