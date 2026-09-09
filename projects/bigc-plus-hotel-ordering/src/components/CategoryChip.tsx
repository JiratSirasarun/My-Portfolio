type CategoryChipProps = {
  label: string
  active: boolean
  onClick: () => void
}

export function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tap-target shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-green-deep bg-green-deep text-ivory'
          : 'border-charcoal/10 bg-white text-charcoal/70'
      }`}
    >
      {label}
    </button>
  )
}
