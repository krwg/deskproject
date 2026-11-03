
export function formatArchiveDate(
  value: string | null | undefined,
  opts: { withTime?: boolean } = {},
): string | null {
  if (!value) return null

  
  if (/^\d{2}\.\d{2}\.\d{4}/.test(value) || /^\d{4}$/.test(value)) {
    return value
  }

  const normalized = value.includes('T')
    ? value
    : value.length === 10
      ? `${value}T12:00:00`
      : value

  const d = new Date(normalized)
  if (Number.isNaN(d.getTime())) return value

  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const base = `${dd}.${mm}.${yyyy}`

  if (!opts.withTime) return base

  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${base} ${hh}:${mi}`
}

export function formatArchiveDateShort(
  value: string | null | undefined,
): string | null {
  const full = formatArchiveDate(value)
  if (!full) return null
  
  const m = full.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  if (!m) return full
  return `${m[1]}.${m[2]}.${m[3].slice(2)}`
}
