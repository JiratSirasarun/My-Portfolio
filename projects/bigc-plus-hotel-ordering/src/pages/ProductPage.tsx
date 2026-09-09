import { Check } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuantityStepper } from '../components/QuantityStepper'
import { StickyHeader } from '../components/StickyHeader'
import { getProduct } from '../data/products'
import { useCartStore } from '../state/cartStore'

export function ProductPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const addItem = useCartStore((s) => s.addItem)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-charcoal/60">We couldn&rsquo;t find that item.</p>
        <button type="button" onClick={() => navigate('/home')} className="text-sm font-semibold text-green-deep underline">
          Back to home
        </button>
      </div>
    )
  }

  function handleAdd() {
    if (!product) return
    addItem(product.id, quantity)
    setJustAdded(true)
    // Return the guest to wherever they came from, not force a cart view.
    setTimeout(() => navigate(-1), 550)
  }

  return (
    <div className="min-h-dvh pb-28">
      <StickyHeader onBack={() => navigate(-1)} />

      <div className="aspect-square w-full overflow-hidden bg-charcoal/5">
        <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="px-5 pt-5">
        {product.isSignature && (
          <span className="mb-2 inline-block rounded-full bg-green-deep px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ivory">
            Signature
          </span>
        )}
        <h1 className="font-display text-2xl leading-snug text-charcoal">{product.name}</h1>
        <p className="mt-1 text-lg font-semibold text-green-deep">฿{product.price.toLocaleString()}</p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{product.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-charcoal/70">Quantity</span>
          <QuantityStepper quantity={quantity} onChange={(q) => setQuantity(Math.max(1, q))} min={1} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-charcoal/5 bg-ivory/95 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur">
        <button
          type="button"
          onClick={handleAdd}
          className="tap-target flex w-full items-center justify-center gap-2 rounded-full bg-green py-3.5 text-sm font-semibold text-green-deep transition-colors"
        >
          {justAdded ? (
            <>
              <Check size={18} strokeWidth={2.25} /> Added to cart
            </>
          ) : (
            `Add to cart — ฿${(product.price * quantity).toLocaleString()}`
          )}
        </button>
      </div>
    </div>
  )
}
