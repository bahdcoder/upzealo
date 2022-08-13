export function formatNumber(amount: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amount)
}
