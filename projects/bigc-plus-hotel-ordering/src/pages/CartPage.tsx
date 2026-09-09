import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CartLineItem } from '../components/CartLineItem'
import { StickyHeader } from '../components/StickyHeader'
import { getProduct } from '../data/products'
import { DELIVERY_FEE, getSubtotal, useCartStore } from '../state/cartStore'

export function CartPage() {
  const navigate = useNavigate()
  const { lines, note, setNote } = useCartStore()

  const subtotal = getSubtotal(lines)
  const total = subtotal + DELIVERY_FEE

  if (lines.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col">
        <StickyHeader onBack={() => navigate('/home')} showCart={false} center={<span className="font-display text-lg text-charcoal">Your Cart</span>} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/15 text-green-deep">
            <ShoppingBag size={28} strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-display text-xl text-charcoal">Your cart is empty</p>
            <p className="mt-1 text-sm text-charcoal/60">
              Browse curated essentials and Thai favorites for your room.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="tap-target rounded-full bg-green px-6 py-3 text-sm font-semibold text-green-deep"
          >
            Start shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh pb-40">
      <StickyHeader onBack={() => navigate(-1)} showCart={false} center={<span className="font-display text-lg text-charcoal">Your Cart</span>} />

      <div className="px-5 pt-2">
        {lines.map((line) => {
          const product = getProduct(line.productId)
          if (!product) return null
          return <CartLineItem key={line.productId} product={product} quantity={line.quantity} />
        })}
      </div>

      <div className="px-5 pt-4">
        <label className="text-xs font-medium text-charcoal/60" htmlFor="cart-note">
          Add a note (optional)
        </label>
        <textarea
          id="cart-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Leave at the door"
          rows={2}
          className="mt-1.5 w-full resize-none rounded-xl border border-charcoal/10 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-green-deep"
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-charcoal/5 bg-ivory/95 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur">
        <div className="space-y-1 pb-3 text-sm">
          <div className="flex justify-between text-charcoal/60">
            <span>Subtotal</span>
            <span>฿{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-charcoal/60">
            <span>Delivery Fee</span>
            <span>฿{DELIVERY_FEE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-semibold text-charcoal">
            <span>Total</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/checkout')}
          className="tap-target flex w-full items-center justify-center gap-1.5 rounded-full bg-green py-3.5 text-sm font-semibold text-green-deep"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}
