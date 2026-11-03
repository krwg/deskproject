import { useEffect, useId, useRef, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { THEME_OPTIONS, type ThemePreference } from '@/theme/theme'
import styles from './ThemeMenu.module.css'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 14.2A7.6 7.6 0 0 1 9.8 4 7.8 7.8 0 1 0 20 14.2Z" />
    </svg>
  )
}

export function ThemeMenu() {
  const { preference, resolved, setPreference } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (value: ThemePreference) => {
    setPreference(value)
    setOpen(false)
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Theme: ${preference}. Open theme menu`}
        title="Theme"
        onClick={() => setOpen((v) => !v)}
      >
        {resolved === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>

      {open && (
        <div className={styles.menu} id={menuId} role="menu" aria-label="Theme">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitemradio"
              aria-checked={preference === opt.value}
              className={[styles.item, preference === opt.value ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => choose(opt.value)}
            >
              <span className={styles.itemLabel}>{opt.label}</span>
              {preference === opt.value && <span className={styles.check} aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
