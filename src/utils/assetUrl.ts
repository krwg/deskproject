export function assetUrl(path: string): string {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  const normalized = path.replace(/^\//, '')

  const encoded = normalized
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `${base}${encoded}`
}

export function padIndex(n: number, digits = 3): string {
  return String(n).padStart(digits, '0')
}
