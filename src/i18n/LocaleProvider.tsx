import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  formatMessage,
  getMessages,
  persistLocale,
  readLocale,
  type Locale,
  type Messages,
} from './index'

type LocaleContextValue = {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
  t: (template: string, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'en' : readLocale(),
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    persistLocale(next)
  }, [])

  const messages = useMemo(() => getMessages(locale), [locale])

  const t = useCallback(
    (template: string, vars?: Record<string, string | number>) =>
      formatMessage(template, vars),
    [],
  )

  const value = useMemo(
    () => ({ locale, messages, setLocale, t }),
    [locale, messages, setLocale, t],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}
