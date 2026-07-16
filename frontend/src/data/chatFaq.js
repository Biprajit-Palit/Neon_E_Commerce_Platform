export const CHAT_FAQ = [
  {
    id: 'track-order',
    label: 'Track my order',
    keywords: ['track', 'order status', 'where is my order', 'delivery status', 'shipping status'],
    answer:
      'To check your order status, log in to your account and open My Orders. You will see each item with its current status — Order Placed, Shipped, Delivered, or Cancelled.',
    links: [{ label: 'View My Orders', to: '/orders' }],
  },
  {
    id: 'returns',
    label: 'Returns & exchanges',
    keywords: ['return', 'refund', 'exchange', 'swap', 'send back'],
    answer:
      'Changed your mind? You can exchange any item within 14 days of delivery. Returns are accepted within 7 days — no questions asked. Items must be unworn with original tags attached.',
    links: [{ label: 'Learn more', to: '/About' }],
  },
  {
    id: 'shipping',
    label: 'Shipping & delivery',
    keywords: ['shipping', 'delivery', 'how long', 'when will', 'dispatch', 'courier'],
    answer:
      'Orders are typically dispatched within 1–2 business days. Standard delivery takes 3–7 business days depending on your location. You will receive updates once your order is shipped.',
    links: [],
  },
  {
    id: 'payment',
    label: 'Payment methods',
    keywords: ['payment', 'pay', 'stripe', 'razorpay', 'cod', 'cash on delivery', 'card', 'upi'],
    answer:
      'We accept Stripe, Razorpay, and Cash on Delivery (COD). Choose your preferred method at checkout. Online payments are processed securely.',
    links: [{ label: 'Go to checkout', to: '/place-order' }],
  },
  {
    id: 'cancel',
    label: 'Cancel my order',
    keywords: ['cancel', 'cancellation', 'stop order'],
    answer:
      'You can request a cancellation before your order is shipped. Go to My Orders to check the status. If it has already shipped, you can initiate a return after delivery.',
    links: [
      { label: 'My Orders', to: '/orders' },
      { label: 'Contact support', to: '/Contact' },
    ],
  },
  {
    id: 'size-guide',
    label: 'Size guide',
    keywords: ['size', 'sizing', 'fit', 'measurement', 'small', 'medium', 'large', 'xl'],
    answer:
      'Each product page shows available sizes (S, M, L, XL). We recommend choosing your usual size for a regular fit. If you are between sizes, size up for a relaxed fit.',
    links: [{ label: 'Browse collection', to: '/collection' }],
  },
  {
    id: 'browse',
    label: 'Browse products',
    keywords: ['product', 'browse', 'shop', 'collection', 'catalogue', 'catalog', 'find clothes'],
    answer:
      'Explore our full collection of thoughtfully designed pieces. Filter by category on the Collection page or check out Best Sellers on the home page.',
    links: [
      { label: 'View collection', to: '/collection' },
      { label: 'Go to home', to: '/' },
    ],
  },
  {
    id: 'delivery-fee',
    label: 'Delivery charges',
    keywords: ['delivery fee', 'delivery charge', 'shipping cost', 'shipping fee', 'how much delivery'],
    answer:
      'A flat delivery fee of $10 is added to every order at checkout. This covers standard shipping to your address.',
    links: [{ label: 'View cart', to: '/cart' }],
  },
  {
    id: 'account',
    label: 'Login & account',
    keywords: ['login', 'log in', 'sign in', 'account', 'register', 'password', 'profile'],
    answer:
      'Create an account or log in to save your cart, track orders, and checkout faster. Your order history is available under My Orders once you are signed in.',
    links: [{ label: 'Login / Sign up', to: '/login' }],
  },
  {
    id: 'contact',
    label: 'Contact support',
    keywords: ['contact', 'support', 'help', 'phone', 'email', 'talk to', 'human', 'agent'],
    answer:
      'Our style team is available 24/7. Reach us at +91 60093 17729 or contact@neon.com. Studio: 12 Artisan Lane, Sector 5, New Delhi — 110 001.',
    links: [{ label: 'Contact page', to: '/Contact' }],
    showSupportForm: true,
  },
]

export const WELCOME_MESSAGE =
  'Hi! I\'m the Neon assistant. Tap a topic below or type your question — I\'m here to help with orders, returns, shipping, and more.'

export const FALLBACK_MESSAGE =
  'I couldn\'t find an exact match for that. Try one of the topics below, visit our Contact page, or send us a message and we\'ll get back to you.'

export const QUICK_REPLY_IDS = CHAT_FAQ.map((faq) => faq.id)

export function findFaqById(id) {
  return CHAT_FAQ.find((faq) => faq.id === id) ?? null
}

export function matchFaqByText(text) {
  const normalized = text.toLowerCase().trim()
  if (!normalized) return null

  let bestMatch = null
  let bestScore = 0

  for (const faq of CHAT_FAQ) {
    let score = 0
    if (normalized.includes(faq.label.toLowerCase())) score += 10
    for (const keyword of faq.keywords) {
      if (normalized.includes(keyword.toLowerCase())) score += keyword.split(' ').length
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = faq
    }
  }

  return bestScore > 0 ? bestMatch : null
}
