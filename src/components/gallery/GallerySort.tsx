import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useLocale } from '@/i18n/LocaleProvider'
import styles from './GallerySort.module.css'

export type GallerySortOrder = 'asc' | 'desc'

type Props = {
  value: GallerySortOrder
  onChange: (value: GallerySortOrder) => void
}

export function GallerySort({ value, onChange }: Props) {
  const { messages, t } = useLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const options = useMemo(
    () => [
      { value: 'asc' as const, label: messages.gallery.oldestFirst },
      { value: 'desc' as const, label: messages.gallery.newestFirst },
    ],
    [messages],
  )
  const current = options.find((o) => o.value === value) ?? options[0]

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

  const choose = (next: GallerySortOrder) => {
    onChange(next)
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
        aria-label={t(messages.gallery.sortAria, { label: current.label })}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerLabel}>{current.label}</span>
        <span className={styles.chevron} data-open={open} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div
          className={styles.menu}
          id={menuId}
          role="menu"
          aria-label={messages.gallery.sortMenu}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitemradio"
              aria-checked={value === opt.value}
              className={[styles.item, value === opt.value ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => choose(opt.value)}
            >
              <span>{opt.label}</span>
              {value === opt.value && <span className={styles.check} aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
