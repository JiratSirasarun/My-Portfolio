import type { Category } from '../types'

export const categories: Category[] = [
  { slug: 'thai-signatures', name: 'Thai Signatures', icon: 'sparkle' },
  { slug: 'breakfast', name: 'Breakfast in Your Room', icon: 'coffee' },
  { slug: 'snacks-treats', name: 'Snacks & Treats', icon: 'cookie' },
  { slug: 'drinks-beverages', name: 'Drinks & Beverages', icon: 'bottle' },
  { slug: 'personal-care', name: 'Personal Care', icon: 'heart' },
  { slug: 'local-favourites', name: 'Local Favourites', icon: 'basket' },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
