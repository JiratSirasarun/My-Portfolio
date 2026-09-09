import { create } from 'zustand'
import { getProduct } from '../data/products'
import type { CartLine } from '../types'

export const DELIVERY_FEE = 0

type CartState = {
  lines: CartLine[]
  note: string
  addItem: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  setNote: (note: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  lines: [],
  note: '',

  addItem: (productId, quantity = 1) =>
    set((state) => {
      const existing = state.lines.find((l) => l.productId === productId)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l,
          ),
        }
      }
      return { lines: [...state.lines, { productId, quantity }] }
    }),

  setQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { lines: state.lines.filter((l) => l.productId !== productId) }
      }
      return {
        lines: state.lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
      }
    }),

  removeItem: (productId) =>
    set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),

  setNote: (note) => set({ note }),

  clear: () => set({ lines: [], note: '' }),
}))

export function getItemCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0)
}

export function getSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => {
    const product = getProduct(l.productId)
    return sum + (product ? product.price * l.quantity : 0)
  }, 0)
}
