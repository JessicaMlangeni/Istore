export const formatPrice = (n) => `$${Number(n).toFixed(2)}`
export const discountPct = (price, original) => Math.round((1 - price / original) * 100)
