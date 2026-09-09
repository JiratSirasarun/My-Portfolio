import { Minus, Plus } from 'lucide-react'

type QuantityStepperProps = {
  quantity: number
  onChange: (next: number) => void
  min?: number
  size?: 'sm' | 'md'
}

export function QuantityStepper({ quantity, onChange, min = 0, size = 'md' }: QuantityStepperProps) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-charcoal/10 bg-white px-1 py-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className={`tap-target flex ${dim} items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5`}
      >
        <Minus size={16} strokeWidth={2} />
      </button>
      <span className="min-w-4 text-center text-sm font-semibold tabular-nums">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className={`tap-target flex ${dim} items-center justify-center rounded-full bg-green text-green-deep hover:brightness-95`}
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    </div>
  )
}
