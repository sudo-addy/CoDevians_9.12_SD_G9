export function formatCurrency(value: number | null | undefined) {
  const n = Number(value ?? 0);
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function formatPercent(value: number | null | undefined) {
  const n = Number(value ?? 0);
  return `${n.toFixed(2)}%`;
}
