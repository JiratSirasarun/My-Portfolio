import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../state/cartStore'
import type { Product } from '../types'
import { QuantityStepper } from './QuantityStepper'

export function CartLineItem({ product, quantity }: { product: Product; quantity: number }) {
  const navigate = useNavigate()
  const setQuantity = useCartStore((s) => s.setQuantity)

  return (
    <div className="flex gap-3 border-b border-charcoal/5 py-4 last:border-none">
      <button
        type="button"
        onClick={() => navigate(`/product/${product.id}`)}
        className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-charcoal/5"
      >
        <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
      </button>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="line-clamp-1 font-display text-[15px] text-charcoal">{product.name}</p>
          <p className="text-xs text-charcoal/50">฿{product.price.toLocaleString()} each</p>
        </div>
        <div className="flex items-center justify-between">
          <QuantityStepper size="sm" quantity={quantity} onChange={(q) => setQuantity(product.id, q)} />
          <span className="text-sm font-semibold text-green-deep">
            ฿{(product.price * quantity).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
