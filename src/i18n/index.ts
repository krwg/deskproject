import { en } from './en'
import { ru } from './ru'
import {
  LOCALE_STORAGE_KEY,
  LOCALES,
  type Locale,
  type Messages,
} from './types'

export type { Locale, Messages }
export { LOCALE_STORAGE_KEY, LOCALES }

const catalogs: Record<Locale, Messages> = { en, ru }

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'ru'
}

export function readLocale(): Locale {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(raw)) return raw
  } catch {
    
  }
  return 'en'
}

export function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    
  }
  document.documentElement.lang = locale
}

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] ?? en
}

export function formatMessage(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  )
}

export function displaySetTitle(title: string, messages: Messages): string {
  const m = title.match(/^Entry\s+(.+)$/i)
  if (!m) return title
  return formatMessage(messages.set.entry, { id: m[1] })
}
