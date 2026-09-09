export type Category = {
  slug: string
  name: string
  icon: string
}

export type Product = {
  id: string
  name: string
  category: string // Category['slug']
  price: number // THB, integer
  isSignature: boolean
  searchable: boolean // enforces the "specific SKU range" search constraint
  imageUrl: string
  description: string
}

export type CartLine = { productId: string; quantity: number }

export type Language = 'en' | 'th'

export type GuestSession = {
  language: Language | null
  hotelName: string
  roomNumber: string
  guestName?: string
}

export type OrderStatus = 'confirmed' | 'preparing' | 'on_the_way' | 'delivered'

export type Order = {
  id: string
  guestName: string
  phone: string
  roomNumber: string
  hotelName: string
  lines: CartLine[]
  note: string
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
}
