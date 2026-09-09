import { CreditCard, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StickyHeader } from '../components/StickyHeader'
import { DELIVERY_FEE, getSubtotal, useCartStore } from '../state/cartStore'
import { useOrderStore } from '../state/orderStore'
import { useSessionStore } from '../state/sessionStore'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { hotelName, roomNumber, setGuestName, setRoomNumber } = useSessionStore()
  const { lines, note, clear } = useCartStore()
  const placeOrder = useOrderStore((s) => s.placeOrder)
  const isSubmitting = useOrderStore((s) => s.isSubmitting)

  const [fullName, setFullName] = useState('')
  // Open question (flagged, not silently resolved): is phone strictly
  // required, or optional-but-requested? Treated as required for now.
  const [phone, setPhone] = useState('')
  const [room, setRoom] = useState(roomNumber)

  const subtotal = getSubtotal(lines)
  const total = subtotal + DELIVERY_FEE
  const canSubmit = fullName.trim().length > 0 && phone.trim().length > 0 && room.trim().length > 0

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) return

    setRoomNumber(room.trim())
    setGuestName(fullName.trim())

    await placeOrder({
      guestName: fullName.trim(),
      phone: phone.trim(),
      roomNumber: room.trim(),
      hotelName,
      lines,
      note,
    })

    clear()
    navigate('/thank-you')
  }

  return (
    <div className="min-h-dvh pb-32">
      <StickyHeader
        onBack={() => navigate(-1)}
        showSearchIcon={false}
        showCart={false}
        center={<span className="font-display text-lg text-charcoal">Checkout</span>}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex flex-col gap-4 px-5 pt-4"
      >
        <Field label="Full name" htmlFor="fullName">
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="As on your booking"
            className="tap-target w-full rounded-xl border border-charcoal/10 bg-white px-3.5 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-green-deep"
          />
        </Field>

        <Field label="Phone number" htmlFor="phone">
          <input
            id="phone"
            required
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="For delivery updates"
            className="tap-target w-full rounded-xl border border-charcoal/10 bg-white px-3.5 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-green-deep"
          />
        </Field>

        <Field label="Room number" htmlFor="room">
          <input
            id="room"
            required
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room number"
            className="tap-target w-full rounded-xl border border-charcoal/10 bg-white px-3.5 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-green-deep"
          />
        </Field>

        <div className="flex items-center gap-2 rounded-xl bg-charcoal/[0.03] px-3.5 py-3 text-xs text-charcoal/55">
          <CreditCard size={16} strokeWidth={1.75} className="shrink-0" />
          Payment by credit card only. You&rsquo;ll be asked for card details on the next screen.
        </div>
      </form>

      <div className="fixed inset-x-0 bottom-0 border-t border-charcoal/5 bg-ivory/95 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur">
        <div className="flex justify-between pb-3 text-base font-semibold text-charcoal">
          <span>Total</span>
          <span>฿{total.toLocaleString()}</span>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="tap-target flex w-full items-center justify-center gap-2 rounded-full bg-green py-3.5 text-sm font-semibold text-green-deep disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Processing payment…
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs font-medium text-charcoal/60">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}
