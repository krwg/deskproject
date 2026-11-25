import { LOCALES } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import styles from './LocaleToggle.module.css'

export function LocaleToggle() {
  const { locale, setLocale, messages } = useLocale()

  return (
    <div className={styles.root} role="group" aria-label={messages.locale.switchAria}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={[styles.btn, locale === code ? styles.active : '']
            .filter(Boolean)
            .join(' ')}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
