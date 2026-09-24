// =============================================================================
// MOCK DATA — swap these arrays for real API data later.
// Layout components only read the fields documented below; no copy, prices or
// coupon text is hard-coded in the components themselves.
// =============================================================================
import { mockProductImage } from './placeholderImage.js';
import vaselinePeachImg from '../assets/vaseline-peach-lotion-1plus1.png';

/**
 * PRODUCTS — one entry per shoppable product/coupon pair.
 * {
 *   id:            string   unique product id (referenced by FEED_ITEMS.productId)
 *   productName:   string   full product name (card truncates with ellipsis)
 *   productNameTh: string?  Thai name shown under the English name on the PDP
 *   productImage:  string   image URL (real packshot or placeholder SVG data URI)
 *   price:         number   selling price in THB
 *   originalPrice: number?  crossed-out price (optional)
 *   unit:          string   pack size shown on PDP
 *   couponText:    string   promo line, format "<Brand>: Buy ฿X, get ฿Y off"
 *   couponMinSpend / couponDiscount: numbers behind couponText (for PDP details)
 *   description:   string   short PDP description
 * }
 */
export const PRODUCTS = [
  {
    id: 'p-vaseline',
    productName: 'Vaseline Healthy Bright Superfood Freshlock Peach Lotion 300 ml Pack 1+1',
    productNameTh: 'วาสลีน เฮลตี้ ไบรท์ ซูเปอร์ฟู้ด เฟรชล็อก พีช โลชั่น 300 มล. แพ็ค 1+1',
    productImage: vaselinePeachImg,
    // Mock price: replace with the live Big C price.
    price: 259,
    originalPrice: 329,
    unit: '300 ml × 2',
    couponText: 'Unilever: Buy ฿499, get ฿45 off',
    couponMinSpend: 499,
    couponDiscount: 45,
    description:
      'Lightweight peach body lotion with superfood extracts and Freshlock technology for brighter, hydrated skin that stays fresh all day. Value twin pack (1+1).',
  },
  {
    id: 'p-sunsilk',
    productName: 'Sunsilk Smooth & Manageable Shampoo',
    productImage: mockProductImage({ bg: '#FDE7EF', body: '#D6336C', cap: '#F5C2D3', label: 'Sunsilk', shape: 'tube' }),
    price: 139,
    originalPrice: 175,
    unit: '350 ml',
    couponText: 'Unilever: Buy ฿299, get ฿30 off',
    couponMinSpend: 299,
    couponDiscount: 30,
    description: 'Smoothing shampoo with argan oil that tames frizz and leaves hair soft and easy to manage.',
  },
  {
    id: 'p-crispy',
    productName: 'Big C Crispy Seaweed Snack Original Family Pack',
    productImage: mockProductImage({ bg: '#EEF7E2', body: '#4E8A1E', cap: '#8BC53F', label: 'Seaweed', shape: 'pack' }),
    price: 89,
    unit: '6 × 32 g',
    couponText: 'Big C: Buy ฿250, get ฿20 off',
    couponMinSpend: 250,
    couponDiscount: 20,
    description: 'Crispy roasted seaweed sheets, lightly salted. Great for lunchboxes and sharing.',
  },
];

/**
 * FEED_ITEMS — one entry per short video in the feed.
 * {
 *   id:              string
 *   productId:       string   links to PRODUCTS[].id (product/coupon card + PDP)
 *   creatorName:     string   seller / creator display name
 *   creatorColor:    string   avatar background (stand-in for a profile photo)
 *   caption:         string   long captions are truncated with "...more"
 *   videoBackground: string   CSS background tint behind the mocked video
 *                             (swap for a <video src> later)
 *   durationSec:     number   length of the mock clip (drives the progress bar)
 *   likeCount, commentCount, saveCount, shareCount: numbers
 *   comments:        { user, text, time, likes }[]  mock comment list
 * }
 */
export const FEED_ITEMS = [
  {
    id: 'v1',
    creatorColor: '#E86A8E',
    durationSec: 15,
    productId: 'p-vaseline',
    creatorName: 'Big C Beauty Official',
    caption:
      'Glow check ✨ 7 days with the new Vaseline Healthy Bright Superfood Freshlock Peach lotion 🍑 Absorbs in seconds, no sticky feel even in Bangkok heat! Grab the Unilever coupon before it runs out #BigCPLUS #glowup #bodycare',
    videoBackground: 'linear-gradient(160deg, #F6D365 0%, #FDA085 50%, #F07B6B 100%)',
    likeCount: 8742,
    commentCount: 1203,
    saveCount: 3120,
    shareCount: 842,
    comments: [
      { user: 'nong_ploy', text: 'Is it good for sensitive skin?', time: '2h', likes: 34 },
      { user: 'Big C Beauty Official', text: '@nong_ploy Yes! It is dermatologically tested 💚', time: '1h', likes: 12 },
      { user: 'somchai.k', text: 'Bought 2 bottles with the coupon 😍', time: '45m', likes: 8 },
      { user: 'mintty', text: 'Smells so fresh', time: '20m', likes: 3 },
    ],
  },
  {
    id: 'v2',
    creatorColor: '#8E6CCF',
    durationSec: 22,
    productId: 'p-sunsilk',
    creatorName: 'HairByFah',
    caption: 'Frizz-free in 1 wash? Testing Sunsilk Smooth & Manageable on my humid-day hair 💁‍♀️',
    videoBackground: 'linear-gradient(200deg, #A18CD1 0%, #FBC2EB 100%)',
    likeCount: 8910,
    commentCount: 312,
    saveCount: 1045,
    shareCount: 210,
    comments: [
      { user: 'aomaom', text: 'Before/after is crazy', time: '5h', likes: 21 },
      { user: 'kittiya', text: 'Where can I buy? Is it at Big C near me?', time: '3h', likes: 2 },
    ],
  },
  {
    id: 'v3',
    creatorColor: '#4E8A1E',
    durationSec: 18,
    productId: 'p-crispy',
    creatorName: 'Big C Snack Lab',
    caption:
      'Movie night snack haul 🍿 Our crispy seaweed family pack is back and now with a Big C coupon. Tag the friend who always finishes the whole pack before the movie even starts!',
    // Deliberately light frame to prove the bottom scrim keeps text legible.
    videoBackground: 'linear-gradient(180deg, #FFFFFF 0%, #E9F6D8 55%, #CFEAAE 100%)',
    likeCount: 152300,
    commentCount: 4820,
    saveCount: 20100,
    shareCount: 6300,
    comments: [
      { user: 'beam_eats', text: 'Family pack for one person 🙋', time: '1d', likes: 402 },
      { user: 'june.j', text: 'Original flavour is the best', time: '18h', likes: 57 },
      { user: 'tawan', text: 'Coupon worked, thanks Big C!', time: '6h', likes: 11 },
    ],
  },
  {
    id: 'v4',
    creatorColor: '#2C4A6E',
    durationSec: 12,
    productId: 'p-vaseline',
    creatorName: 'SkinDiaryTH',
    caption: 'Night routine, body edition 🌙 Peach lotion, then sleep. That is it. The 1+1 pack lasts me two months #BigCPLUS',
    videoBackground: 'linear-gradient(170deg, #243B55 0%, #141E30 100%)',
    likeCount: 3402,
    commentCount: 98,
    saveCount: 640,
    shareCount: 57,
    comments: [{ user: 'pim', text: 'Simple and effective 👌', time: '3h', likes: 4 }],
  },
];

export const getProduct = (productId) => PRODUCTS.find((p) => p.id === productId);
