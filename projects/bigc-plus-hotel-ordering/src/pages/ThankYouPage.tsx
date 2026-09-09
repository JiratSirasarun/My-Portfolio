import { Check, CheckCircle2, Clock, Package, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '../state/orderStore'

const stages = [
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'preparing', label: 'Preparing', icon: Package },
  { key: 'on_the_way', label: 'On the way', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Clock },
] as const

export function ThankYouPage() {
  const navigate = useNavigate()
  const order = useOrderStore((s) => s.lastOrder)

  function startNewOrder() {
    navigate('/home')
  }

  return (
    <div className="flex min-h-dvh flex-col items-center px-6 pb-10 pt-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green text-green-deep shadow-soft">
        <Check size={30} strokeWidth={2.5} />
      </span>

      <h1 className="mt-5 font-display text-2xl text-charcoal">Order Confirmed!</h1>
      <p className="mt-2 max-w-xs text-sm text-charcoal/60">
        {order ? (
          <>
            Thanks, {order.guestName.split(' ')[0]}. We&rsquo;re preparing your items and will deliver to Room{' '}
            {order.roomNumber} shortly.
          </>
        ) : (
          'We’re preparing your items and will deliver to your room shortly.'
        )}
      </p>

      <div className="mt-10 w-full max-w-sm">
        <div className="flex items-start justify-between">
          {stages.map((stage, i) => {
            const Icon = stage.icon
            const complete = i === 0
            return (
              <div key={stage.key} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-center">
                  {i > 0 && <span className={`h-0.5 flex-1 ${complete ? 'bg-green' : 'bg-charcoal/10'}`} />}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      complete ? 'bg-green text-green-deep' : 'bg-charcoal/10 text-charcoal/35'
                    }`}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  {i < stages.length - 1 && <span className="h-0.5 flex-1 bg-charcoal/10" />}
                </div>
                <span className={`text-[11px] font-medium ${complete ? 'text-charcoal' : 'text-charcoal/40'}`}>
                  {stage.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {order && (
        <div className="mt-10 w-full max-w-sm rounded-2xl bg-white p-4 text-left shadow-card">
          <div className="flex justify-between text-sm text-charcoal/60">
            <span>Order</span>
            <span className="font-medium text-charcoal">{order.id}</span>
          </div>
          <div className="mt-1.5 flex justify-between text-sm text-charcoal/60">
            <span>Total</span>
            <span className="font-medium text-charcoal">฿{order.total.toLocaleString()}</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={startNewOrder}
        className="tap-target mt-10 w-full max-w-sm rounded-full bg-green-deep py-3.5 text-sm font-semibold text-ivory"
      >
        Start a new order
      </button>
    </div>
  )
}
