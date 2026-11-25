export function siteOrigin(): string {
  const fromEnv = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
    /\/+$/,
    '',
  )
  if (fromEnv) return fromEnv

  if (typeof window !== 'undefined' && window.location?.origin) {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
    return `${window.location.origin}${base}`
  }

  return 'https://krwg.github.io/deskproject'
}

export function absoluteUrl(path: string): string {
  if (!path) return `${siteOrigin()}/`
  if (/^https?:\/\//i.test(path)) return path

  const origin = siteOrigin()
  let cleaned = path.replace(/^\//, '')
  const baseSeg = (import.meta.env.BASE_URL || '/')
    .replace(/^\/+|\/+$/g, '')
  if (baseSeg && (cleaned === baseSeg || cleaned.startsWith(`${baseSeg}/`))) {
    cleaned = cleaned.slice(baseSeg.length).replace(/^\//, '')
  }
  return cleaned ? `${origin}/${cleaned}` : `${origin}/`
}
