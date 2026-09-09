import { Check, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../state/cartStore'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)

  function handleQuickAdd(e: React.MouseEvent) {
    e.stopPropagation()
    addItem(product.id, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <button
      type="button"
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-card transition-transform active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-charcoal/5">
        <img src={product.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        {product.isSignature && (
          <span className="absolute left-2 top-2 rounded-full bg-green-deep px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ivory">
            Signature
          </span>
        )}
        <span
          role="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={handleQuickAdd}
          className={`tap-target absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full shadow-soft transition-colors ${
            justAdded ? 'bg-green-deep text-ivory' : 'bg-green text-green-deep'
          }`}
        >
          {justAdded ? <Check size={18} strokeWidth={2.25} /> : <Plus size={18} strokeWidth={2.25} />}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 px-3 py-2.5">
        <span className="line-clamp-2 font-display text-[15px] leading-snug text-charcoal">{product.name}</span>
        <span className="mt-auto text-sm font-semibold text-green-deep">฿{product.price.toLocaleString()}</span>
      </div>
    </button>
  )
}
