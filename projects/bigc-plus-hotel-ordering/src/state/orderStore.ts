import { create } from 'zustand'
import type { CartLine, Order } from '../types'
import { DELIVERY_FEE, getSubtotal } from './cartStore'

type PlaceOrderInput = {
  guestName: string
  phone: string
  roomNumber: string
  hotelName: string
  lines: CartLine[]
  note: string
}

type OrderState = {
  lastOrder: Order | null
  isSubmitting: boolean
  placeOrder: (input: PlaceOrderInput) => Promise<Order>
}

let orderSequence = 1000

export const useOrderStore = create<OrderState>((set) => ({
  lastOrder: null,
  isSubmitting: false,

  placeOrder: async (input) => {
    set({ isSubmitting: true })

    // Mocked network round-trip for payment + order creation.
    await new Promise((resolve) => setTimeout(resolve, 1400))

    const subtotal = getSubtotal(input.lines)
    const order: Order = {
      id: `BC-${orderSequence++}`,
      guestName: input.guestName,
      phone: input.phone,
      roomNumber: input.roomNumber,
      hotelName: input.hotelName,
      lines: input.lines,
      note: input.note,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      status: 'confirmed',
    }

    set({ lastOrder: order, isSubmitting: false })
    return order
  },
}))
